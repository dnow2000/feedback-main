from repository.tags import sync as sync_tags
from tasks import celery_app


@celery_app.task(name='sync-tags')
def sync_tags_task():
    sync_tags()
