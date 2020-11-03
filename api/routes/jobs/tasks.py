from celery.result import AsyncResult
from flask import current_app as app, jsonify, request

from tasks import celery_app
from utils.celery import result_formatted


@app.route('/jobs/tasks/<uuid:task_id>')
def task_result(task_id):
    result = AsyncResult(str(task_id), app=celery_app)
    result.get()
    return jsonify(result_formatted(result))


@app.route('/jobs/tasks/<tasks_type>')
def list_tasks(tasks_type):
    if tasks_type in (
        'active',
        'reserved',
        'registered',
        'revoked',
        'scheduled'
    ):
        try:
            insp = celery_app.control.inspect()
            print(insp.__dir__())
            tasks = getattr(insp, tasks_type)()
            return jsonify(tasks)
        except Exception as e:
            return jsonify({'Exception': str(e)}), 500
    else:
        return jsonify({'Error': f'Could not find the tasks of type: "{tasks_type}"'}), 404
