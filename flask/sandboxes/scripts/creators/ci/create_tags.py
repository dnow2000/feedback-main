from models.manager import Manager
from tests.utils import create_tag
from utils.logger import logger

from sandboxes.scripts.utils.tags import ALL_TAGS

def create_tags():
    logger.info('create_tags')

    tags_by_name = {}

    for tag in ALL_TAGS:
        tags_by_name[tag] = create_tag(tag)

    Manager.check_and_save(*tags_by_name.values())

    logger.info('created {} tags'.format(len(tags_by_name)))

    return tags_by_name
