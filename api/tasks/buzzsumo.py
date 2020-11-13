from sqlalchemy_api_handler import ApiHandler

from domain.tasks import planified_dates_for
from domain.trendings.buzzsumo import trending_from_url
from tasks import celery_app
import tasks.newspaper
import tasks.screenshotmachine


@celery_app.task
def sync_with_trending(content_id=None):
    content = ApiHandler.model_from_name('Content') \
                        .query.get(content_id)
    trending = trending_from_url(content.url)
    if trending:
        content.modify(trending)
        ApiHandler.save(content)

    if content.buzzsumoIdentifier:
        for eta in planified_dates_for('buzzsumo.sync_with_trending'):
            #tasks.buzzsumo.sync_with_trending.apply_async(content_id, eta=eta)
            pass
    elif content.type.value == 'article':
        tasks.newspaper.sync_with_article.delay(content_id)
        if not content.urlNotFound:
            for eta in planified_dates_for('newspaper.sync_with_article'):
                #tasks.newspaper.sync_with_article.apply_async(content_id, eta=eta)
                pass
        if not content.externalThumbUrl and content.thumbCount == 0:
            #tasks.screenshotmachine.sync_with_capture(content_id)
            pass
