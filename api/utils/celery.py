from celery.app.control import Inspect
from datetime import datetime


TASK_STATES = [
    'active',
    'reserved',
    'revoked',
    'scheduled'
]


def as_dict(result):
    return {
        'args': result.args,
        'date_done': result.date_done,
        'info': result.info,
        'kwargs': result.kwargs,
        'name': result.name,
        'queue': result.queue,
        'result': result.result,
        'status': result.status,
        'task_id': result.id,
        'traceback': result.traceback,
        'worker': result.worker
    }


def task_types_from(celery_app):
    return sorted([
        { 'label': task.name.replace('tasks.', ''), 'value': task.name }
        for task in celery_app.tasks.values()
        if task.name.startswith('tasks.')
    ], key=lambda task_type: task_type['label'])


def tasks_from(celery_app,
               name=None,
               args=None,
               hostname=None,
               kwargs=None,
               queue=None,
               state=None,
               time=None,
               type=None):

    insp = celery_app.control.inspect()

    tasks = []
    for task_state in TASK_STATES:
        if state and state != task_state:
            continue
        tasks_by_worker_name = getattr(insp, task_state)()
        if not tasks_by_worker_name:
            continue
        for ts in tasks_by_worker_name.values():
            task = {}
            for t in ts:
                task['args'] = t['args']
                if args and set(args) != set(task['args']):
                    continue
                task['hostname'] = t['hostname']
                if hostname and hostname != task['hostname']:
                    continue
                task['uuid'] = t['id']
                task['kwargs'] = t['kwargs']
                if kwargs and kwargs != task['kwargs']:
                    continue
                task['name'] = t['name']
                if name and name != task['name']:
                    continue
                task['queue'] = t['delivery_info']['routing_key']
                if queue and queue != task['queue']:
                    continue
                task['state'] = task_state
                if state and state != task['state']:
                    continue
                task['time'] = datetime.fromtimestamp(t['time_start']) \
                               if t.get('time_start') else None
                if time and time != task['time']:
                    continue
                tasks.append(task)
    return tasks
