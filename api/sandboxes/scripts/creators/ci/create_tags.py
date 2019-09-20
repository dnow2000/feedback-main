from sqlalchemy_handler import Handler

from tests.utils import create_tag
from utils.logger import logger

from sandboxes.scripts.utils.tags import ALL_TAGS

def create_tags():
    logger.info('create_tags')

    tags_by_text = {}

    for tag in ALL_TAGS:
        tags_by_text[tag['text']] = create_tag(tag['text'], info=tag.get('info'))

    Handler.save(*tags_by_text.values())

    logger.info('created {} tags'.format(len(tags_by_text)))

    return tags_by_text
