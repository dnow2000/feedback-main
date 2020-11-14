from sqlalchemy_api_handler import ApiHandler

from domain.trendings.buzzsumo import trending_from_url
from tasks import celery_app


@celery_app.task
def sync_with_trending(content_id=None):
    print('BUZZ', content_id, [c.id for c in ApiHandler.model_from_name('Content').query.all()])
    content = ApiHandler.model_from_name('Content') \
                        .query.get(content_id)
    trending = trending_from_url(content.url)
    if trending:
        content.modify(trending)
        ApiHandler.save(content)
