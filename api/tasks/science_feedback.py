from celery_worker import celery_app
from repository.science_feedback.airtable import sync, sync_outdated_rows


# Get all data from airtable
@celery_app.task(name='sync_science_feedback')
def sync_airtable_task(sync_to_airtable=False):
    sync(sync_to_airtable=sync_to_airtable)


# Get updated data from airtable
@celery_app.task(name='sync_outdated_airtable_rows')
def sync_outdated_rows_task():
    sync_outdated_rows()
