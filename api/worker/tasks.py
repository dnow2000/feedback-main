import os
import celery


app = celery.Celery(
    'jobs',
    broker=os.environ.get('REDIS_URL'),
    backend=os.environ.get('REDIS_URL')
)


@app.task
def hello_world(name):
    return f'Hello World, {name}!'
