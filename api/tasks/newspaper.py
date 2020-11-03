from domain.newspaper import article_from_url
from tasks import celery_app


@celery_app.task
def sync_with_articke(content):
    newspaper = newspaper_from_url(content.url)
    if newspaper:
        return content.modify(newspaper)
