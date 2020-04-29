import os
from sqlalchemy_api_handler import ApiHandler

from domain.science_feedback import request_airtable_rows_for
import repository.science_feedback.entity_from_row


def entity_from_row_for(name, entity_dict):
    function_name = '{}_from_row'.format(name)
    entity_from_row_function = getattr(repository.science_feedback.entity_from_row, function_name)
    return entity_from_row_function(entity_dict)


def sync(name, max_records=None):
    rows = request_airtable_rows_for(name, max_records=max_records)

    entities = []
    for row in rows:
        entity = entity_from_row_for(name, row)
        if entity:
            entities.append(entity)

    ApiHandler.save(*entities)


def sync_all(max_records=None):
    for name in ['reviewer', 'article', 'claim', 'review']:
        sync(name, max_records=max_records)
