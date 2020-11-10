import os
import celery
from celery.signals import task_postrun, task_prerun
from datetime import datetime
from flask import Flask

import tasks.celeryconfig
from utils.setup import setup


celery_app = celery.Celery('{}-tasks'.format(os.environ.get('APP_NAME')))
                           #backend=os.environ.get('REDIS_URL'),
                           #broker=os.environ.get('REDIS_URL'))
celery_app.config_from_object(tasks.celeryconfig)
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


def import_tasks():
    import tasks.buzzsumo
    import tasks.crowdtangle
    import tasks.hello
    import tasks.graph
    import tasks.newspaper
    import tasks.sandbox
    import tasks.science_feedback
    import tasks.screenshotmachine
    import tasks.tags
    import tasks.waybackmachine

if os.environ.get('IS_WORKER'):
    import_tasks()
