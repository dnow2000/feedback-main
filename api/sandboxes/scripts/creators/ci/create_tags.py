from sqlalchemy_api_handler import ApiHandler, logger

from models.tag import Tag
from sandboxes.scripts.utils.tags import ALL_TAGS


def create_tags():
    logger.info('create_tags')

    tags_by_text = {}

    for tag in ALL_TAGS:
        tags_by_text[tag['text']] = Tag(**tag)

    ApiHandler.save(*tags_by_text.values())

    logger.info('created {} tags'.format(len(tags_by_text)))

    return tags_by_text
