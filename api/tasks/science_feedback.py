import repository.science_feedback.airtable
from tasks import celery_app


@celery_app.task
def sync_airtable(sync_to_airtable=False):
    repository.science_feedback.airtable.sync(sync_to_airtable=sync_to_airtable)


@celery_app.task
def sync_outdated_rows():
    repository.science_feedback.airtable.sync_outdated_rows()
