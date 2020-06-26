from sqlalchemy_api_handler import ApiHandler, logger

from models.scope import Scope, ScopeType
from models.tag import Tag
from sandboxes.scripts.utils.tags import ARTICLE_TAGS, \
                                         USER_TAGS

def create_scopes():
    logger.info('create_scopes')

    scopes = []

    for article_tag in ARTICLE_TAGS:
        tag = Tag.query.filter_by(label=article_tag['label']).one()
        scopes.append(Scope(
            tag=tag,
            type=ScopeType.CONTENT
        ))

    for user_tag in USER_TAGS:
        tag = Tag.query.filter_by(label=user_tag['label']).one()
        scopes.append(Scope(
            tag=tag,
            type=ScopeType.USER
        ))

    ApiHandler.save(*scopes)

    logger.info('created {} scopes'.format(len(scopes)))
