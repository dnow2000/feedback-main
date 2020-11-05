import os
import celery
from celery.signals import task_postrun, task_prerun
from datetime import datetime
from flask import Flask

from utils.setup import setup


celery_app = celery.Celery('{}-jobs'.format(os.environ.get('APP_NAME')),
                           backend=os.environ.get('REDIS_URL'),
                           broker=os.environ.get('REDIS_URL'))

BaseTask = celery_app.Task

class AppTask(BaseTask):
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


celery_app.Task = AppTask


if os.environ.get('IS_WORKER'):
    import tasks.buzzsumo
    import tasks.crowdtangle
    import tasks.graph
    import tasks.science_feedback
    import tasks.tags
