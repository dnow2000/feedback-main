import celery

from celery import current_task
from celery.signals import task_postrun, task_prerun
from datetime import datetime


class TimedTask(celery.Task):
    @task_prerun.connect
    def pre_run(task_id, task, *args, **kwargs):
        task.start_time = datetime.utcnow()

    @task_postrun.connect
    def post_run(task_id, task, *args, **kwargs):
        task.duration = datetime.utcnow() - task.start_time


def import_tasks():
    import tasks.hello_world
    import tasks.science_feedback


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
