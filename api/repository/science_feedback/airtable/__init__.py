# pylint: disable=C0415

import os
from sqlalchemy_api_handler import ApiHandler, logger

from repository.science_feedback.airtable.create_or_modify_sf_organization_and_media import create_or_modify_sf_organization_and_media
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
    'verdict': 'Reviews / Fact-checks',
}


def entity_from_row_for(name, entity_dict, index):
    import repository.science_feedback.airtable.entity_from_row as entity_from_row
    function_name = '{}_from_row'.format(name)
    entity_from_row_function = getattr(entity_from_row, function_name)
    return entity_from_row_function(entity_dict, index)


def sync_for(name, max_records=None):
    rows = request_airtable_rows(
        SCIENCE_FEEDBACK_AIRTABLE_BASE_ID,
        NAME_TO_AIRTABLE[name],
        max_records=max_records
    )

    entities = []
    for (index, row) in enumerate(rows):
        entity = entity_from_row_for(name, row, index)
        if entity:
            entities.append(entity)

    ApiHandler.save(*entities)


def sync(max_records=None):
    logger.info('sync science feedback airtable data...')

    create_or_modify_sf_organization_and_media()

    for name in NAME_TO_AIRTABLE:
        sync_for(name, max_records=max_records)
    logger.info('sync science feedback airtable data...Done.')
