import base64
import json


TASK_TYPES = [
    'active',
    'reserved',
    'registered',
    'revoked',
    'scheduled'
]


def task_as_dict(task, *args, **kwargs):
    result = task.apply_async(args=args, kwargs=kwargs)
    result.get()
    return result_formatted(result)


def result_formatted(result):
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


def active_queue_names_from(celery_app):
    insp = celery_app.control.inspect()
    active_queues_by_name_and_hash = insp.active_queues()
    print(active_queues_by_name_and_hash)
    if active_queues_by_name_and_hash:
        for queue in active_queues_by_name_and_hash.values():
            print(queue)
        '''
        return [
            queue['name']
            for queue in active_queues_by_name_and_hash.values()
        ]
        '''


def tasks_from(celery_app,
               queue_name='celery@7082a6f0503c',
               type=None):
    """
    tasks = []
    for task_type in TASK_TYPES:
        if type and type != task_type:
            continue
        insp = celery_app.control.inspect()
        tasks.append(getattr(insp, task_type)())
    """
    print(active_queue_names_from(celery_app))


    with celery_app.pool.acquire(block=True) as conn:
        tasks = conn.default_channel.client.lrange(queue_name, 0, -1)
        tasks = []

    for task in tasks:
        j = json.loads(task)
        body = json.loads(base64.b64decode(j['body']))
        tasks.append(body)
    return tasks
