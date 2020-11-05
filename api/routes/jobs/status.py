import string

from celery.result import AsyncResult
from flask import current_app as app, jsonify
from re import split
from sqlalchemy_api_handler.serialization import as_dict

from tasks import celery_app
from utils.celery import result_formatted


@app.route('/jobs/status/<uuid:task_id>')
def task_result(task_id):
    result = AsyncResult(str(task_id), app=celery_app)
    result.get()
    return jsonify(result_formatted(result))


@app.route('/jobs/list/<tasks_type>')
def list_tasks(tasks_type):
    try:
        insp = celery_app.control.inspect()
        tasks = getattr(insp, tasks_type)()
        if tasks_type in (
            'active',
            'reserved',
            'revoked',
            'scheduled'
        ):
            return jsonify(tasks)
        elif tasks_type == 'registered':
            return jsonify(_format_registered_task_list(list(tasks.values()), tasks_type))
        else:
            return jsonify({'Error': f'Could not find the tasks of type: "{tasks_type}"'}), 404
    except Exception as e:
        return jsonify({'Exception': str(e)}), 500

# Sample return from '/jobs/list/active' => TODO: process this return to get active tasks' statuses
# {
#   "celery@1f50b4a32a3c": [
#     {
#       "acknowledged": true,
#       "args": [],
#       "delivery_info": {
#         "exchange": "",
#         "priority": 0,
#         "redelivered": null,
#         "routing_key": "celery"
#       },
#       "hostname": "celery@1f50b4a32a3c",
#       "id": "b4145d4c-9dc1-4af9-8e11-c5935890a499",
#       "kwargs": {
#         "sync_to_airtable": false
#       },
#       "name": "sync-science_feedback/airtable",
#       "time_start": 1604584917.2405272,
#       "type": "sync-science_feedback/airtable",
#       "worker_pid": 15
#     }
#   ],
# }


def _format_registered_task_list(task_lists, tasks_type):
    formatted_tasks = {tasks_type: {}}
    for task_list in task_lists:
        task_group = {}
        for task in task_list:
            if '-' in task:
                cat, path = task.split('-')
                path = f'{cat}/{path}'
            else:
                cat, path = ['uncategorised', task]
            task_group[cat] = task_group.get(cat) or []
            task_group[cat].append({
                'name': string.capwords(' '.join(split('/|_', path))),
                'path': f'/jobs/{path}'
            })
        formatted_tasks[tasks_type] = {**formatted_tasks[tasks_type], **task_group}
    return formatted_tasks
