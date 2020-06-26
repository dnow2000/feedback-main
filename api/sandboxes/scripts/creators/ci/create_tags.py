from sqlalchemy_api_handler import ApiHandler, logger

from models.tag import Tag
from sandboxes.scripts.utils.tags import ALL_TAGS


def create_tags():
    logger.info('create_tags')

    tags = []

    for tag in ALL_TAGS:
        tags.append(Tag(**tag))

    ApiHandler.save(*tags)

    logger.info('created {} tags'.format(len(tags)))
