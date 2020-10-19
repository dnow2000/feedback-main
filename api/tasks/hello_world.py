from celery_worker import celery_app


@celery_app.task(name='Hello, World!')
def hello_world(name):
    return f'Hello World, {name}!'
