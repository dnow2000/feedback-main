import os
from sqlalchemy_api_handler import ApiHandler

from domain.newspaper import article_from_url
from tasks import celery_app
from utils.database import db


@celery_app.task
def sync_with_article(content_id=None):
    content = ApiHandler.model_from_name('Content') \
                        .query.get(content_id)
    # NOTE: make sur your nltk_data is in a not permission denied folder like /usr/lib/nltk_data
    newspaper = article_from_url(content.url)
    if newspaper:
        content.modify(newspaper)
        ApiHandler.save(content)
        return newspaper
    return { 'urlNotFound': 'No newspaper article for {}'.format(content.url) }
