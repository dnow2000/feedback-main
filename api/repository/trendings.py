import sys

from models.utils.db import get_model_with_table_name


def keep_not_saved_trendings(trendings, trending_type):
    model = get_model_with_table_name(trending_type)

    source_ids = [trending['sourceId'] for trending in trendings]

    saved_entities = model.query\
                             .filter(
                                 model.sourceId.in_(source_ids)
                             ).all()

    saved_source_ids = [
        saved_entity.sourceId
        for saved_entity in saved_entities
    ]

    return [
        trending for trending in trendings
        if trending['sourceId'] not in saved_source_ids
    ]
