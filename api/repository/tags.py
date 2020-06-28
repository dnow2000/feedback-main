from sqlalchemy import and_
from sqlalchemy_api_handler import ApiHandler, humanize, logger

from models.scope import Scope
from domain.tags import TAGS
from models.tag import Tag


def keep_tags_with_scopes(query, scopes):
    scopes_filter = and_(*[Tag.scopes.any(Scope.type == scope) for scope in scopes])
    query = query.filter(scopes_filter)
    return query


def sync():
    logger.info('sync tags data...')
    tags = []
    for tag_dict in TAGS:
        tag = Tag.create_or_modify({
            '__SEARCH_BY__': ['label', 'type'],
            **tag_dict
        })
        tags.append(tag)
    ApiHandler.save(*tags)
    logger.info('sync tags data...Done.')
