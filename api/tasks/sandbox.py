from sqlalchemy_api_handler import ApiHandler

from domain.user import store_user_thumb_from_sandbox
from repository.crowdtangle import share_appearances_from_content
from tasks import celery_app


@celery_app.task
def sync_with_thumb(user_id):
    user = ApiHandler.model_from_name('User') \
                        .query.get(user_id)
    store_user_thumb_from_sandbox(user)
