from sqlalchemy_api_handler import ApiHandler, logger

from models.scope import Scope, ScopeType
from models.tag import Tag
from sandboxes.scripts.utils.tags import ARTICLE_TAGS, \
                                         REVIEW_VERDICT_TAGS, \
                                         USER_TAGS

def create_scopes():
    logger.info('create_scopes')

    scopes = []

    for article_tag in ARTICLE_TAGS:
        tag = Tag.query.filter_by(text=article_tag['text']).one()
        scopes.append(Scope(
            tag=tag,
            type=ScopeType.article.value
        ))

    for review_verdict_tag in REVIEW_VERDICT_TAGS:
        tag = Tag.query.filter_by(text=review_verdict_tag['text']).one()
        scopes.append(Scope(
            tag=tag,
            type=ScopeType.review.value
        ))

        scopes.append(Scope(
            tag=tag,
            type=ScopeType.verdict.value
        ))

    for user_tag in USER_TAGS:
        tag = Tag.query.filter_by(text=user_tag['text']).one()
        scopes.append(Scope(
            tag=tag,
            type=ScopeType.user.value,
        ))

    ApiHandler.save(*scopes)

    logger.info('created {} scopes'.format(len(scopes)))
