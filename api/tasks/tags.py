from celery_worker import celery_app
from models.appearance import Appearance
from repository.tags import sync as sync_tags


@celery_app.task(name='sync_tags')
def sync_tags_task():
    apps = Appearance.query.all()
    print(f'appearances are {apps}')
