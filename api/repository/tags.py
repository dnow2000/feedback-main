from sqlalchemy import and_
from sqlalchemy_api_handler import ApiHandler, humanize, logger

from models.scope import Scope
from domain.tags import TAGS
from models.tag import Tag


def filter_tags_with_scopes(query, scopes):
    scopes_filter = and_(*[Tag.scopes.any(Scope.type == scope) for scope in scopes])
    query = query.filter(scopes_filter)
    return query


def sync():
    logger.info('sync tags data...')
    tags = []
    for tag_dict in TAGS:
        tag = Tag.create_or_modify(tag_dict, search_by=['label', 'type'])
        if not tag.id:
            print('ON SAVE')
            ApiHandler.save(tag)
        if 'scopes' in tag_dict:
            print("EEE", tag.id)
            for scope_dict in tag_dict['scopes']:
                print(scope_dict)
                scope = Scope.create_or_modify({
                    'tagId': humanize(tag.id),
                    'type': scope_dict['type']
                }, search_by=['tagId', 'type'])
                print(scope)
                tag.scopes = tag.scopes + [scope]

        print(tag)
        tags.append(tag)


    ApiHandler.save(*tags)
    logger.info('sync tags data...Done')
