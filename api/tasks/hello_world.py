from celery_worker import celery_app
from time import sleep


@celery_app.task(bind=True, name='hello_world')
def hello_world(self, name):
    sleep(10)
    return f'Hello World, {name}!'
