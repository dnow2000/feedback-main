from compose import compose
import json
import re
from sqlalchemy import String
from sqlalchemy.sql.expression import and_
from flask import current_app as app, jsonify
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.serialization import as_dict, \
                                                 exclusive_includes_from


INDEXES = range(0, 10)


def query_filter_from(**kwargs):
    model = ApiHandler.model_from_name(kwargs['name'].title())
    query_filters = []
    for couple in kwargs.items():
        if not couple[1] or not re.match('item\d$', couple[0]):
            continue
        (key, value) = couple[1].split(',')
        if '.' in key:
            keys = key.split('.')
            left_value = getattr(model, keys[0])
            for other_key in keys[1:]:
                left_value = left_value[other_key]
            left_value = left_value.astext.cast(String)
        else:
            left_value = getattr(model, key)
        query_filters.append(left_value == value)
    query = model.query.filter(and_(*query_filters))
    if 'limit' in kwargs:
        query = query.limit(kwargs['limit'])
    return query


def includes_from(entity, **kwargs):
    includes = kwargs.get('includes')
    if includes:
        if ',' in includes:
            return exclusive_includes_from(entity,
                                           includes.split(','))
        return includes
    if hasattr(entity, '__as_dict_includes__'):
        return entity.__as_dict_includes__
    return None


def printify(entities_or_entity, **kwargs):
    not_list = not isinstance(entities_or_entity, list)
    entities = [entities_or_entity] if not_list else entities_or_entity

    includes = includes_from(entities[0], **kwargs) if entities else None

    entity_dicts_or_dict = [as_dict(entity,
                                    includes=includes,
                                    mode=kwargs.get('mode')) for entity in entities]
    if not_list:
        entity_dicts_or_dict = entity_dicts_or_dict[0]

    response = jsonify(entity_dicts_or_dict)
    dumps = json.dumps(response.json, indent=2, sort_keys=True)
    print(dumps)


@compose(app.manager.option('-m',
                            '--mode',
                            help='as_dict mode'),
         app.manager.option('-n',
                            '--name',
                            help='model name'),
         app.manager.option('-i',
                            '--includes',
                            help='includes'),
         app.manager.option('-l',
                            '--limit',
                            help='limit'),
         *[app.manager.option('-i{}'.format(index),
                              '--item{}'.format(index),
                              help='item filtering')
           for index in INDEXES])
def filter(**kwargs):
    entities = query_filter_from(**kwargs).all()
    printify(entities, **kwargs)
