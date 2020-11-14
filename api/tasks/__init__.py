import os
import sys
from flask_sqlalchemy import SQLAlchemy
from traceback import format_exception
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
from utils.database import db
from utils.date import strptime
from utils.setup import setup



celery_app = celery.Celery('{}-tasks'.format(os.environ.get('APP_NAME')),
                           backend=os.environ.get('REDIS_URL'),
                           broker=os.environ.get('REDIS_URL'))
celery_app.conf.task_default_queue = 'default'

BaseTask = celery_app.Task


task_db_session = SQLAlchemy().session


class AppTask(BaseTask):
    abstract = True

    @before_task_publish.connect
    def create_task(body, headers, routing_key, **kwargs):
        task = Task(args=body[0],
                    celeryUuid=headers['id'],
                    kwargs=body[1],
                    name=headers['task'],
                    planificationTime=strptime('{}Z'.format(headers['eta'])) \
                                      if headers.get('eta') else None,
                    queue=routing_key,
                    startTime=datetime.utcnow(),
                    state=TaskState.CREATED)
        task_db_session.add(task)
        task_db_session.commit()

    @after_task_publish.connect
    def modify_task_to_published_state(headers, **kwargs):
        task = task_db_session.query(Task) \
                              .filter_by(celeryUuid=headers['id']) \
                              .one()
        task.state = TaskState.PUBLISHED
        task_db_session.add(task)
        task_db_session.commit()

    @task_received.connect
    def modify_task_to_received_state(request, sender, **kwargs):
        task = task_db_session.query(Task) \
                              .filter_by(celeryUuid=request.id) \
                              .one()
        task.hostname = sender.hostname
        task.state = TaskState.RECEIVED
        task_db_session.add(task)
        task_db_session.commit()

    @task_prerun.connect
    def modify_task_to_started_state(task_id, task, **kwargs):
        task = task_db_session.query(Task) \
                              .filter_by(celeryUuid=task_id) \
                              .one()
        task.startTime = datetime.utcnow()
        task.state = TaskState.STARTED
        task_db_session.add(task)
        task_db_session.commit()

    @task_failure.connect
    def modify_task_to_failure_state(sender, traceback, **kwargs):
        task = task_db_session.query(Task) \
                              .filter_by(celeryUuid=sender.request.id) \
                              .one()
        exc_type, exc_value, exc_traceback = sys.exc_info()
        task.traceback = ' '.join(format_exception(exc_type,
                                                   exc_value,
                                                   traceback))
        task.stopTime = datetime.utcnow()
        task.state = TaskState.FAILURE
        task_db_session.add(task)
        task_db_session.commit()

    @task_success.connect
    def modify_task_to_success_state(sender, result, **kwargs):
        task = task_db_session.query(Task) \
                              .filter_by(celeryUuid=sender.request.id) \
                              .one()
        task.result = result
        task.stopTime = datetime.utcnow()
        task.state = TaskState.SUCCESS
        task_db_session.add(task)
        task_db_session.commit()

    @task_postrun.connect
    def remove_session(*args, **kwargs):
        task_db_session.remove()
        db.session.remove()

    @task_revoked.connect
    def modify_task_to_revoked_state(request, **kwargs):
        task = task_db_session.query(Task) \
                              .filter_by(celeryUuid=request.id) \
                              .one()
        task.stopTime = datetime.utcnow()
        task.state = TaskState.STOPPED
        task_db_session.add(task)
        task_db_session.commit()


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
