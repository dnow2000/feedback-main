import os
from celery.result import AsyncResult
from flask import current_app as app, jsonify, request
from flask_login import current_user, login_required
from sqlalchemy import desc
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.serialization import as_dict
from sqlalchemy_api_handler.utils import load_or_404

from models.task import Task, TaskState
from repository.keywords import keywords_filter_from
from tasks import celery_app, import_tasks
from utils.database import db
from utils.rest import listify


#@login_required
@app.route('/taskNameOptions')
def get_task_name_options():
    #check_user_has_role(current_user, 'ADMIN')
    import_tasks()
    task_name_options = sorted([
        { 'label': task.name.replace('tasks.', ''), 'value': task.name }
        for task in celery_app.tasks.values()
        if task.name.startswith('tasks.')
    ], key=lambda option: option['label'])
    return jsonify(task_name_options)

#@login_required
@app.route('/taskStateOptions')
def get_task_state_options():
    #check_user_has_role(current_user, 'ADMIN')
    task_state_options = sorted([
        { 'label': task_state.value.upper(), 'value': task_state.name }
        for task_state in TaskState
    ], key=lambda option: option['label'])
    return jsonify(task_state_options)

#@login_required
@app.route('/tasks')
def get_tasks():
    #check_user_has_role(current_user, 'ADMIN')
    query = Task.query

    kwargs = {**request.args}
    if 'page' in kwargs:
        del kwargs['page']

    keywords = request.args.get('keywords')
    if keywords is not None:
        query = query.filter(keywords_filter_from(Task, keywords))
        del kwargs['keywords']

    query = query.filter_by(**kwargs)

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
    celery_task = AsyncResult(str(task.celeryUuid), app=celery_app)
    print('lll', celery_task.state, task.state)
    #print(celery_task.traceback)
    print('m', task.traceback)
    d = as_dict(task)
    #d['traceback'] = '{0!r}'.format(celery_task.traceback)
    return jsonify(d)


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
@app.route('/tasks/<task_id>', methods=['PUT'])
def modify_task(task_id):
    #check_user_has_role(current_user, 'ADMIN')
    task = load_or_404(Task, task_id)
    #celery_task = AsyncResult(str(task.celeryUuid), app=celery_app)
    #celery_task.get()
    r = celery_app.control.revoke(task.celeryUuid)
    #print(celery_task)
    print(request.json, r, task)
    # TODO delete
    return jsonify(as_dict(task))


#@login_required
@app.route('/tasks/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    #check_user_has_role(current_user, 'ADMIN')
    task = load_or_404(Task, task_id)
    celery_app.control.terminate(task.celeryUuid)
    ApiHandler.delete(task)
    db.session.commit()
    return jsonify({ 'id': task_id })
