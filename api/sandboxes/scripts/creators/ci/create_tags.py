from sqlalchemy_api_handler import ApiHandler, logger

from sandboxes.scripts.utils.tags import ALL_TAGS
from tests.utils.creators.create_tag import create_tag

def create_tags():
    logger.info('create_tags')

    tags_by_text = {}

    for tag in ALL_TAGS:
        tags_by_text[tag['text']] = create_tag(tag['text'], info=tag.get('info'))

    ApiHandler.save(*tags_by_text.values())

    logger.info('created {} tags'.format(len(tags_by_text)))

    return tags_by_text
