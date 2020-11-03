from repository.science_feedback.airtable import sync, sync_outdated_rows
from tasks import celery_app


# Get all data from airtable
@celery_app.task(name='sync-science_feedback/airtable')
def sync_airtable_task(sync_to_airtable=False):
    sync(sync_to_airtable=sync_to_airtable)


# Get updated data from airtable
@celery_app.task(name='sync-science_feedback/outdated_rows')
def sync_outdated_rows_task():
    sync_outdated_rows()
