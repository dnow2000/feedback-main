from sqlalchemy_api_handler import ApiHandler

from tasks import celery_app
from utils.waybackmachine import url_from_archive_services


@celery_app.task
def sync_with_archive(content_id):
    content = ApiHandler.model_from_name('Content') \
                        .query.get(content_id)
    if not self.archiveUrl:
        if self.type.value == 'article':
            content.archiveUrl = url_from_archive_services(content.url)
            ApiHandler.save(content)
            return { 'archiveUrl': content.archiveUrl }
        else:
            return { 'type': 'Content is not an article so no need to archive.' }
    return { 'archiveUrl': 'Exists so no need to archive' }
