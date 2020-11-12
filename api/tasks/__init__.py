import os
import celery
from celery.signals import after_task_publish, \
                           before_task_publish, \
                           task_failure, \
                           task_internal_error, \
                           task_postrun, \
                           task_prerun, \
                           task_received, \
                           task_retry, \
                           task_revoked, \
                           task_success
from datetime import datetime
from flask import Flask
from sqlalchemy_api_handler import ApiHandler

from models.task import Task, TaskState
from utils.setup import setup


celery_app = celery.Celery('{}-tasks'.format(os.environ.get('APP_NAME')),
                           backend=os.environ.get('REDIS_URL'),
                           broker=os.environ.get('REDIS_URL'))
BaseTask = celery_app.Task


class AppTask(BaseTask):
    abstract = True

    @before_task_publish.connect
    def create_task(body, headers, routing_key, **kwargs):
        task = Task(args=body[0],
                    celeryUuid=headers['id'],
                    kwargs=body[1],
                    name=headers['task'],
                    queue=routing_key,
                    startTime=datetime.utcnow(),
                    state=TaskState.CREATED)
        ApiHandler.save(task)

    @after_task_publish.connect
    def modify_task_to_published_state(headers, **kwargs):
        task = Task.query.filter_by(celeryUuid=headers['id']).one()
        task.state = TaskState.PUBLISHED
        ApiHandler.save(task)

    @task_received.connect
    def modify_task_to_received_state(request, sender, **kwargs):
        task = Task.query.filter_by(celeryUuid=request.id).one()
        task.hostname = sender.hostname
        task.state = TaskState.RECEIVED
        ApiHandler.save(task)

    @task_prerun.connect
    def modify_task_to_started_state(task_id, task, **kwargs):
        task = Task.query.filter_by(celeryUuid=task_id).one()
        task.startTime = datetime.utcnow()
        task.state = TaskState.STARTED
        ApiHandler.save(task)

    @task_failure.connect
    def modify_task_to_failure_state(sender, result, **kwargs):
        print('FAILURE')
        task = Task.query.filter_by(celeryUuid=sender.request.id).one()
        task.result = result
        task.stopTime = datetime.utcnow()
        task.state = TaskState.FAILURE
        ApiHandler.save(task)

    @task_success.connect
    def modify_task_to_success_state(sender, result, **kwargs):
        task = Task.query.filter_by(celeryUuid=sender.request.id).one()
        task.result = result
        task.state = TaskState.SUCCESS
        ApiHandler.save(task)

    """
    @task_postrun.connect
    def modify_task_to_stopped_state(task_id, **kwargs):
        print('ICI')
        task = Task.query.filter_by(celeryUuid=task_id).one()
        if task.state not in [TaskState.FAILURE, TaskState.SUCCESS]:
            task.stopTime = datetime.utcnow()
            task.state = TaskState.STOPPED
        ApiHandler.save(task)
    """

    @task_revoked.connect
    def modify_task_to_revoked_state(request, **kwargs):
        print('REVOKED')
        task = Task.query.filter_by(celeryUuid=request.id).one()
        task.stopTime = datetime.utcnow()
        task.state = TaskState.STOPPED
        ApiHandler.save(task)

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
    flask_app = Flask(__name__)
    setup(flask_app)
    import_tasks()
