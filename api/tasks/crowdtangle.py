from sqlalchemy_api_handler import ApiHandler

from repository.crowdtangle import share_appearances_from_content
from tasks import celery_app


@celery_app.task
def sync_with_shares(content_id):
    content = ApiHandler.model_from_name('Content') \
                        .query.get(content_id)
    share_appearances_from_content(content)
    ApiHandler.save(content)
