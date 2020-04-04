import sys

from models.utils.db import get_model_with_table_name


def keep_not_saved_trendings(trendings, trending_type):
    model = get_model_with_table_name(trending_type)

    source_ids = [trending['source']['id'] for trending in trendings]

    print(source_ids, model)

    saved_entities = model.query\
                             .filter(
                                 model.source['id'].in_(source_ids)
                             ).all()

    print('DDD')

    saved_source_ids = [
        saved_entity.source['id']
        for saved_entity in saved_entities
    ]

    return [
        trending for trending in trendings
        if trending['source']['id'] not in saved_source_ids
    ]
