from sqlalchemy_api_handler import ApiHandler

from repository.crowdtangle import share_appearances_from_content
from tasks import celery_app


@celery_app.task(bind=True, default_retry_delay=30, max_retries=100)
def sync_with_shares(self, content_id):
    try:
        content = ApiHandler.model_from_name('Content') \
                            .query.get(content_id)
        share_appearances_from_content(content)
        ApiHandler.save(content)
    except Exception:
        self.retry()
