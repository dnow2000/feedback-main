from sqlalchemy_api_handler import ApiHandler

from domain.tasks import planified_dates_for
from repository.crowdtangle import share_appearances_from_content
from tasks import celery_app


@celery_app.task(bind=True,
                 default_retry_delay=30,
                 max_retries=100)
def sync_with_shares(self, content_id):
    try:
        content = ApiHandler.model_from_name('Content') \
                            .query.get(content_id)
        links = share_appearances_from_content(content)
        ApiHandler.save(content)
        return { 'sharesCount': len(links) }
    except Exception:
        self.retry()


@celery_app.task
def planify_sync_with_shares(content_id=None):
    content = ApiHandler.model_from_name('Content') \
                        .query.get(content_id)
    planified_dates = planified_dates_for('crowdtangle.sync_with_shares')
    chain(*map(lambda planified_date: sync_with_share.si(content_id=content_id)
                                                     .set(eta=planified_date),
               planified_dates)).delay()
    return { 'planifiedDates': [strftime(d) for d in planified_dates] }
