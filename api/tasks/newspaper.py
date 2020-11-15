import os
from sqlalchemy_api_handler import ApiHandler

from domain.tasks import planified_dates_for
from domain.newspaper import article_from_url
from tasks import celery_app
from utils.database import db


@celery_app.task
def sync_with_article(content_id=None):
    content = ApiHandler.model_from_name('Content') \
                        .query.get(content_id)
    if content.buzzsumoIdentifier:
        return { 'buzzsumoIdentifier': 'Exists so no need to ask for newspaper' }
    if content.type.value != 'article':
        return { 'type': 'This content is not an article' }
    # NOTE: make sur your nltk_data is in a not permission denied folder like /usr/lib/nltk_data
    newspaper = article_from_url(content.url)
    if newspaper:
        content.modify(newspaper)
        ApiHandler.save(content)
        return newspaper
    return { 'urlNotFound': 'No newspaper article for {}'.format(content.url) }


@celery_app.task
def planify_sync_with_article(content_id=None):
    content = ApiHandler.model_from_name('Content') \
                        .query.get(content_id)
    if not content.urlNotFound:
        planified_dates = planified_dates_for('newspaper.sync_with_article')
        chain(*map(lambda planified_date: sync_with_article.si(content_id=content_id)
                                                           .set(eta=planified_date),
                   planified_dates)).delay()
        return { 'planifiedDates': [strftime(d) for d in planified_dates] }
    else:
        return { 'urlNotFound' : 'No newspaper found for this url so no need to planify tasks.'}
