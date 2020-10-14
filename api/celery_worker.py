import os
import celery


celery_app = celery.Celery(
    f'{os.environ.get("APP_NAME")}-jobs',
    broker=os.environ.get('REDIS_URL'),
    backend=os.environ.get('REDIS_URL')
)


@celery_app.task
def hello_world(name):
    print('Reached Hello World Task')
    return f'Hello World, {name}!'
