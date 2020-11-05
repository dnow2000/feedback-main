from sqlalchemy_api_handler import ApiHandler

from storage.thumb import save_thumb
from tasks import celery_app
from utils.screenshotmachine import capture


@celery_app.task
def sync_with_capture(content_id):
    content = ApiHandler.model_from_name('Content') \
                        .query.get(content_id)
    thumb = capture(content.url)
    save_thumb(content, thumb, 0, convert=False)
    ApiHandler.save(content)
