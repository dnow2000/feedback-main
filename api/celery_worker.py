import os
import celery

from celery.signals import task_postrun, task_prerun
from datetime import datetime
from flask import Flask
from tasks import import_tasks
from utils.setup import setup


celery_app = celery.Celery(
    f'{os.environ.get("APP_NAME")}-jobs',
    broker=os.environ.get('REDIS_URL'),
    backend=os.environ.get('REDIS_URL')
)


def init_celery(celery_app):
    BaseTask = celery_app.Task

    class FeedbackTask(BaseTask):
        abstract = True

        @task_prerun.connect
        def pre_run(task_id, task, *args, **kwargs):
            task.start_time = datetime.utcnow()

        @task_postrun.connect
        def post_run(task_id, task, *args, **kwargs):
            task.duration = datetime.utcnow() - task.start_time

        def __call__(self, *args, **kwargs):
            flask_app = Flask(__name__)
            setup(flask_app)
            with flask_app.app_context():
                return BaseTask.__call__(self, *args, **kwargs)

    celery_app.Task = FeedbackTask


init_celery(celery_app)
import_tasks()
