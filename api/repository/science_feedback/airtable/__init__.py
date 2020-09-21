# pylint: disable=C0415

import os
import sys

from datetime import datetime
from psycopg2.errors import NotNullViolation
from sqlalchemy_api_handler import ApiHandler, logger

from repository.contents import sync_content
from repository.science_feedback.airtable.create_or_modify_sf_organization_and_media import create_or_modify_sf_organization_and_media
from repository.science_feedback.wordpress.claim_verdicts import claim_verdicts_from_airtable
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
        logger.info(f'syncing table {NAME_TO_AIRTABLE[name]}')
        sync_for(
            name,
            formula='FIND("Out of sync", {Sync status})>0',
            max_records=max_records,
            sync_to_airtable=True
        )
    logger.info('sync science feedback outdated airtable data...Done.')


def sync_for(name, formula=None, max_records=None, sync_to_airtable=False):
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
                row['Synced time input'] = datetime.now().isoformat()
            else:
                row['Synced time input'] = 'ERROR'
        except KeyError as exception:
            logger.warning(f'Error while trying to create entity from row at table {NAME_TO_AIRTABLE[name]}')
            logger.error(f'KeyError {exception}: {row}')
            row['Synced time input'] = 'ERROR'
            continue
        except Exception as exception:
            logger.warning(f'Error while trying to create entity from row at table {NAME_TO_AIRTABLE[name]}')
            logger.error(f'Unexpected error: {exception} - {sys.exc_info()[0]} at {row}')
            row['Synced time input'] = 'ERROR'
            continue

    try:
        # Sync verdict status from wordpress
        if name == 'verdict' and formula is not None:
            entities = claim_verdicts_from_airtable(verdicts_to_sync=entities)

        ApiHandler.save(*entities)

        # Sync related contents for appearances
        if name == 'appearance' and formula is not None:
            for entity in entities:
                sync_content(entity.quotingContent)

        # Set the time synced so that the status in airtable is "Synced"
        if sync_to_airtable:
            records = [{'id': row['airtableId'], 'fields': {'Synced time input': row['Synced time input']}} for row in rows]
            for i in range(0, len(records), 10):
                res = update_airtable_rows(
                    SCIENCE_FEEDBACK_AIRTABLE_BASE_ID,
                    NAME_TO_AIRTABLE[name],
                    {'records': records[i:i + 10]}
                )

                if res.status_code != 200:
                    logger.error('code: {}, error: {}'.format(res.status_code, res.content))

    except NotNullViolation as exception:
        logger.warning(f'Error while trying to save entities at table {NAME_TO_AIRTABLE[name]}')
        logger.error(f'NotNullViolation: {exception}'.format(exception))
    except Exception as exception:
        logger.warning(f'Error while trying to save entities at table {NAME_TO_AIRTABLE[name]}')
        logger.error(f'Unexpected error: {exception} - {sys.exc_info()[0]}')


def sync(max_records=None, sync_to_airtable=False):
    logger.info('sync science feedback airtable data...')

    create_or_modify_sf_organization_and_media()

    for name in NAME_TO_AIRTABLE:
        sync_for(name, max_records=max_records, sync_to_airtable=sync_to_airtable)
    logger.info('sync science feedback airtable data...Done.')
