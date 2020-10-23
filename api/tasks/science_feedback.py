from flask import current_app as flask_app


from celery_worker import celery_app
from repository.science_feedback.airtable import sync, sync_outdated_rows


# Get all data from airtable
@celery_app.task(name='sync_science_feedback')
def sync_airtable_task(sync_to_airtable=False):
    with flask_app.app_context():
        sync(sync_to_airtable=sync_to_airtable)


# Get updated data from airtable
@celery_app.task(name='sync_outdated_airtable_rows')
def sync_outdated_rows_task():
    with flask_app.app_context():
        sync_outdated_rows()
