from sqlalchemy_api_handler import ApiHandler

from tasks import celery_app
from utils.ovh.thumb import save_thumb
from utils.screenshotmachine import capture


@celery_app.task
def sync_with_capture(content_id=None):
    content = ApiHandler.model_from_name('Content') \
                        .query.get(content_id)
    if not content.externalThumbUrl:
        if content.thumbCount == 0:
            if not content.urlNotFound:
                thumb = capture(content.url)
                save_thumb(content, thumb, 0, convert=False)
                ApiHandler.save(content)
                return { 'thumbCount': content.thumbCount }
            else:
                return { 'urlNotFound': 'Exists so we cannot capture something.' }
        else:
            return { 'thumbCount': 'Exists so no need to capture.' }
    else:
        print(content.externalThumbUrl)
        return { 'externalThumbUrl': 'Exists so no need to capture.'}
