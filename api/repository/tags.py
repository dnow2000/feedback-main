from sqlalchemy import and_
from sqlalchemy_api_handler import ApiHandler, humanize, logger

from models.scope import Scope, ScopeType
from domain.tags import TAGS
from models.tag import Tag, TagType


def keep_tags_with_scopes(query, scope_type_keys):
    scopes_filter = and_(*[
        Tag.scopes.any(Scope.type == getattr(ScopeType, scope_type_key))
        for scope_type_key in scope_type_keys
    ])
    query = query.filter(scopes_filter)
    return query


def keep_tags_with_type(query, tag_type_key):
    return query.filter_by(type=getattr(TagType, tag_type_key))


def sync():
    logger.info('sync tags data...')
    tags = []
    print('TAGS is {}'.format(TAGS))
    for tag_dict in TAGS:
        tag = Tag.create_or_modify({
            '__SEARCH_BY__': ['label', 'type'],
            **tag_dict
        })
        tags.append(tag)
    ApiHandler.save(*tags)
    logger.info('sync tags data...Done.')
