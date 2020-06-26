from sqlalchemy import and_, Integer

from utils.db import get_model_with_table_name


def keep_not_saved_trendings(trendings, table_name):
    model = get_model_with_table_name(table_name)

    identifier_key = 'buzzsumoIdentifier' if table_name == 'content' \
                                          else 'poynterIdentifier'

    already_saved_identifiers = [str(trending[identifier_key]) for trending in trendings]
    is_already_saved_query = getattr(model, identifier_key).in_(already_saved_identifiers)
    already_saved_entities = model.query \
                          .filter(is_already_saved_query) \
                          .all()

    saved_source_ids = [
        getattr(saved_entity, identifier_key)
        for saved_entity in already_saved_entities
    ]

    return [
        trending for trending in trendings
        if trending[identifier_key] not in saved_source_ids
    ]
