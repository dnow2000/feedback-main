from sqlalchemy_api_handler import ApiHandler

from tasks import celery_app
from utils.waybackmachine import url_from_archive_services


@celery_app.task
def sync_with_archive(content_id):
    content = ApiHandler.model_from_name('Content') \
                        .query.get(content_id)
    content.archiveUrl = url_from_archive_services(content.url)
    ApiHandler.save(content)
