from sqlalchemy_api_handler import ApiHandler, logger

from models.scope import ScopeType
from models.tag import Tag
from tests.utils.creators.create_scope import create_scope

from sandboxes.scripts.utils.tags import ARTICLE_TAGS, \
                                         REVIEW_VERDICT_TAGS, \
                                         USER_TAGS

def create_scopes():
    logger.info('create_scopes')

    scopes_by_name = {}

    for article_tag in ARTICLE_TAGS:
        tag = Tag.query.filter_by(text=article_tag['text']).one()
        scopes_by_name["article {}".format(article_tag)] = create_scope(
            tag,
            scope_type="article"

        )

    for review_verdict_tag in REVIEW_VERDICT_TAGS:
        tag = Tag.query.filter_by(text=review_verdict_tag['text']).one()
        scopes_by_name["review {}".format(review_verdict_tag)] = create_scope(
            tag,
            scope_type="review"
        )

        scopes_by_name["verdict {}".format(review_verdict_tag)] = create_scope(
            tag,
            scope_type="verdict"
        )

    for user_tag in USER_TAGS:
        tag = Tag.query.filter_by(text=user_tag['text']).one()
        scopes_by_name["review {}".format(user_tag)] = create_scope(
            tag,
            scope_type="user"
        )

    ApiHandler.save(*scopes_by_name.values())

    logger.info('created {} scopes'.format(len(scopes_by_name)))

    return scopes_by_name
