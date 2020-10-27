def import_tasks():
    import tasks.hello_world
    import tasks.science_feedback
    import tasks.tags


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
