from sqlalchemy_api_handler import ApiHandler

from domain.newspaper import article_from_url
from tasks import celery_app
from utils.database import db
from sqlalchemy import event

@celery_app.task
def sync_with_article(content_id):
    content = ApiHandler.model_from_name('Content') \
                        .query.get(content_id)
    newspaper = article_from_url(content.url)
    if newspaper:
        content.modify(newspaper)
        ApiHandler.save(content)
