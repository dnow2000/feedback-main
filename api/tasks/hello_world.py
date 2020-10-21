from celery_worker import celery_app


@celery_app.task(name='hello_world')
def hello_world(name):
    return f'Hello World, {name}!'
