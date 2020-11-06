from celery_worker import celery_app
from repository.tags import sync as sync_tags


@celery_app.task(name='sync-tags')
def sync_tags_task():
    sync_tags()
