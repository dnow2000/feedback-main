from celery_worker import celery_app


@celery_app.task(bind=True, name='hello_world')
def hello_world(self, name):
    return f'Hello World, {name}!'
