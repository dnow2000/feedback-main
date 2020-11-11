import os
from celery.result import AsyncResult
from flask import current_app as app, jsonify, request
from flask_login import current_user, login_required
from sqlalchemy import desc
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.serialization import as_dict
from sqlalchemy_api_handler.utils import load_or_404

from models.task import Task
from tasks import celery_app
from utils.celery import task_types_from
from utils.rest import listify


#@login_required
@app.route('/taskTypes')
def get_task_types():
    #check_user_has_role(current_user, 'ADMIN')
    return jsonify(task_types_from(celery_app))

#@login_required
@app.route('/tasks')
def get_tasks():
    #check_user_has_role(current_user, 'ADMIN')
    query = Task.query

    kwargs = {**request.args}
    if 'page' in kwargs:
        del kwargs['page']

    query = query.order_by(desc(Task.id))

    return listify(Task,
                   query=query,
                   page=request.args.get('page', 1),
                   paginate=os.environ.get('TASKS_PAGINATION', 10),
                   with_total_data_count=True)


#@login_required
@app.route('/tasks/<task_id>')
def get_task(task_id):
    #check_user_has_role(current_user, 'ADMIN')
    task = load_or_404(Task, task_id)
    return jsonify(as_dict(task))


#@login_required
@app.route('/tasks', methods=['POST'])
def create_task():
    #check_user_has_role(current_user, 'ADMIN')
    celery_task = celery_app.tasks[request.args['name']]
    args = request.args.get('args', [])
    kwargs = request.args.get('kwargs', {})
    celery_uuid = celery_task.delay(*args, **kwargs)
    task = Task.filter_by(celeryUuid=celery_uuid).one()
    return jsonify(as_dict(task))


#@login_required
@app.route('/tasks/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    #check_user_has_role(current_user, 'ADMIN')
    task = load_or_404(Task, task_id)
    celery_task = AsyncResult(str(task.celeryUuid), app=celery_app)
    celery_task.get()
    # TODO delete
    return jsonify({ 'id': task_id })
