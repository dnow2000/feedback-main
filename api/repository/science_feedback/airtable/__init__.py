# pylint: disable=C0415

import os
import sys

from datetime import datetime
from psycopg2.errors import NotNullViolation
from sqlalchemy_api_handler import ApiHandler, logger

from repository.science_feedback.airtable.create_or_modify_sf_organization_and_media import create_or_modify_sf_organization_and_media
from utils.airtable import request_airtable_rows, update_airtable_rows


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


def sync_outdated_rows(max_records=None):
    logger.info('sync science feedback outdated airtable data...')
    for name in NAME_TO_AIRTABLE:
        sync_for(name, formula='FIND("Out of sync", {Sync status})>0', max_records=max_records)
    logger.info('sync science feedback outdated airtable data...Done.')


def sync_for(name, formula=None, max_records=None):
    rows = request_airtable_rows(
        SCIENCE_FEEDBACK_AIRTABLE_BASE_ID,
        NAME_TO_AIRTABLE[name],
        filter_by_formula=formula,
        max_records=max_records
    )

    entities = []
    for (index, row) in enumerate(rows):
        try:
            entity = entity_from_row_for(name, row, index)
            if entity:
                entities.append(entity)
        except KeyError as exception:
            logger.error('KeyError {}: at [{}] - {}'.format(exception, index, row))
        except Exception as exception:
            logger.error("Unexpected error: {} - {}".format(exception, sys.exc_info()[0]))

    try:
        ApiHandler.save(*entities)
        records = [{'id': row['airtableId'], 'fields': {'Last synced time': datetime.now().isoformat()}} for row in rows]
        for i in range(0, len(records), 10):
            res = update_airtable_rows(
                SCIENCE_FEEDBACK_AIRTABLE_BASE_ID,
                NAME_TO_AIRTABLE[name],
                {'records': records[i:i + 10]}
            )

            if res.status_code != 200:
                logger.error('code: {}, error: {}'.format(res.status_code, res.content))

    except NotNullViolation as exception:
        logger.error('NotNullViolation: {}'.format(exception))
    except Exception as exception:
        logger.error("Unexpected error: {} - {}".format(exception, sys.exc_info()[0]))


def sync(max_records=None):
    logger.info('sync science feedback airtable data...')

    create_or_modify_sf_organization_and_media()

    for name in NAME_TO_AIRTABLE:
        sync_for(name, max_records=max_records)
    logger.info('sync science feedback airtable data...Done.')
