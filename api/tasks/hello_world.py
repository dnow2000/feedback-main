<<<<<<< HEAD
from celery_worker import celery_app
from time import sleep
=======
from tasks import celery_app
>>>>>>> 793833b (create dafter insert celery tasks)


@celery_app.task(bind=True, name='hello_world')
def hello_world(self, name):
    sleep(10)
    return f'Hello World, {name}!'
