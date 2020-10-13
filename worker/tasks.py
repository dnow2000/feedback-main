import celery
import os


app = celery.Celery('tasks')

app.conf.update(
    broker_url=os.environ.get('REDIS_URL'),
    result_backend=os.environ.get('REDIS_URL')
)


@app.task
def hello_world():
    print('HELLO WORLD!')
