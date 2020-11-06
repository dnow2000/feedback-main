from sqlalchemy_api_handler import ApiHandler

from domain.tags import TAGS
from tasks import celery_app


@celery_app.task
def sync_tags():
    Tag = ApiHandler.model_from_name('Tag')
    for tag_dict in TAGS:
        tag = Tag.create_or_modify({
            '__SEARCH_BY__': ['label', 'type'],
            **tag_dict
        })
        tags.append(tag)
    ApiHandler.save(*tags)
