import os
from sqlalchemy_api_handler import ApiHandler

import repository.science_feedback.entity_from_row
from utils.airtable import request_airtable_rows


SCIENCE_FEEDBACK_AIRTABLE_BASE_ID = os.environ.get('SCIENCE_FEEDBACK_AIRTABLE_BASE_ID')


NAME_TO_AIRTABLE = {
    'author': 'Authors',
    'editor': 'Editors',
    'reviewer': 'Reviewers',
    'claim': 'Items for review / reviewed',
    'social': 'Social Media Influent.',
    'outlet': 'Outlets',
    'appearance': 'Appearances',
    'review': 'Reviews / Fact-checks',
}


def entity_from_row_for(name, entity_dict):
    function_name = '{}_from_row'.format(name)
    entity_from_row_function = getattr(repository.science_feedback.entity_from_row, function_name)
    return entity_from_row_function(entity_dict)


def sync_for(name, max_records=None):
    rows = request_airtable_rows(
        SCIENCE_FEEDBACK_AIRTABLE_BASE_ID,
        NAME_TO_AIRTABLE[name],
        max_records=max_records
    )

    entities = []
    for row in rows:
        entity = entity_from_row_for(name, row)
        if entity:
            entities.append(entity)

    ApiHandler.save(*entities)


def sync(max_records=None):
    for name in NAME_TO_AIRTABLE:
        sync_for(name, max_records=max_records)
