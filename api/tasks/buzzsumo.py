from celery import chain
from sqlalchemy_api_handler import ApiHandler

from domain.tasks import planified_dates_for
from domain.trendings.buzzsumo import trending_from_url
from tasks import celery_app
from utils.date import strftime


@celery_app.task
def sync_with_trending(content_id=None):
    content = ApiHandler.model_from_name('Content') \
                        .query.get(content_id)
    trending = trending_from_url(content.url)
    if trending:
        content.modify(trending)
        ApiHandler.save(content)
    return trending


@celery_app.task
def planify_sync_with_trending(content_id=None):
    content = ApiHandler.model_from_name('Content') \
                        .query.get(content_id)
    if content.buzzsumoIdentifier:
        planified_dates = planified_dates_for('buzzsumo.sync_with_trending')
        chain(*map(lambda planified_date: sync_with_trending.si(content_id=content_id)
                                                            .set(eta=planified_date),
                   planified_dates)).delay()
        return { 'planifiedDates': [strftime(d) for d in planified_dates] }
    else:
        return { 'buzzsumoIdentifier' : 'Exists so no need to planify trending tasks.'}
