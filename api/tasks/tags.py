from celery_worker import celery_app
from repository.tags import sync as sync_tags


@celery_app.task(bind=True, name='sync_tags')
def sync_tags_task(self):
    sync_tags()
