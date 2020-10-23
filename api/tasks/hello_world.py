from celery_worker import celery_app

from tasks import TimedTask


@celery_app.task(base=TimedTask, bind=True, name='hello_world')
def hello_world(self, name):
    return f'Hello World, {name}!'
