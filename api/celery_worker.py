import os
import celery

from celery.signals import task_postrun, task_prerun
from datetime import datetime
from flask import current_app as flask_app, jsonify
from tasks import import_tasks


celery_app = celery.Celery(
    f'{os.environ.get("APP_NAME")}-jobs',
    broker=os.environ.get('REDIS_URL'),
    backend=os.environ.get('REDIS_URL')
)


def init_celery(celery_app, flask_app):
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
            return BaseTask.__call__(self, *args, **kwargs)

    celery_app.Task = FeedbackTask


init_celery(celery_app, flask_app)
import_tasks()
