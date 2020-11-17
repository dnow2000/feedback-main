# pylint: disable=C0415
import os
import sys
import requests
from datetime import datetime
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.utils import logger

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
    'link': 'Appearances',
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
        sync_for(name,
                 formula='FIND("Out of sync", {Sync status})>0',
                 max_records=max_records,
                 sync_to_airtable=True)
    logger.info('sync science feedback outdated airtable data...Done.')


def sync_for(name,
             formula=None,
             max_records=None,
             session=None,
             sync_to_airtable=False):
    if session is None:
        session = requests.Session()

    rows = request_airtable_rows(SCIENCE_FEEDBACK_AIRTABLE_BASE_ID,
                                 NAME_TO_AIRTABLE[name],
                                 filter_by_formula=formula,
                                 max_records=max_records,
                                 session=session)

    entities = []
    if rows:
        logger.info(f'syncing table {NAME_TO_AIRTABLE[name]}')
    else:
        logger.info(f'nothing to sync for table {NAME_TO_AIRTABLE[name]}')

    for (index, row) in enumerate(rows):
        try:
            entity = entity_from_row_for(name, row, index)
            if entity:
                entities.append(entity)
                row['Synced time input'] = datetime.now().isoformat()
            else:
                row['Synced time input'] = f'Could not create {name} from row'
        except KeyError as exception:
            logger.warning(f'Error while trying to create entity from row at table {NAME_TO_AIRTABLE[name]}')
            logger.error(f'KeyError {exception}: {row}')
            row['Synced time input'] = f'KeyError {exception}'
        except Exception as exception:
            logger.warning(f'Error while trying to create entity from row at table {NAME_TO_AIRTABLE[name]}')
            logger.error(f'Unexpected error: {exception} - {sys.exc_info()[0]} at {row}')
            row['Synced time input'] = f'Unexpected error: {exception}'

    def _update_10_rows_from_index(i):
        records = [{
            'id': row['airtableId'],
            'fields': {'Synced time input': row['Synced time input']}
        } for row in rows[i: i + 10]]
        res = update_airtable_rows(SCIENCE_FEEDBACK_AIRTABLE_BASE_ID,
                                   NAME_TO_AIRTABLE[name],
                                   {'records': records},
                                   session=session)

        if res.status_code != 200:
            logger.error(f'code: {res.status_code}, error: {res.content}')

    try:
        # Sync verdict status from wordpress
        if name == 'verdict' and formula is not None:
            entities = claim_verdicts_from_airtable(verdicts_to_sync=entities)

        # Set the time synced so that the status in airtable is "Synced"
        if sync_to_airtable:
            for i in range(0, len(rows), 10):
                try:
                    ApiHandler.save(*entities[i:i + 10])
                    _update_10_rows_from_index(i)

                except Exception as exception:
                    logger.warning(f'Error while trying to save 10 entities at table {NAME_TO_AIRTABLE[name]}')
                    logger.error(f'Unexpected error: {exception} - {sys.exc_info()[0]}')
                    for index in range(i, i + 10):
                        rows[index]['Synced time input'] = f'Batch error: {exception}'
                    _update_10_rows_from_index(i)
        else:
            ApiHandler.save(*entities)

    except Exception as exception:
        logger.warning(f'Error while trying to save entities at table {NAME_TO_AIRTABLE[name]}')
        logger.error(f'Unexpected error: {exception} - {sys.exc_info()[0]}')


def sync(max_records=None, sync_to_airtable=False):
    logger.info('sync science feedback airtable data...')

    create_or_modify_sf_organization_and_media()

    for name in NAME_TO_AIRTABLE:
        sync_for(name,
                 max_records=max_records,
                 sync_to_airtable=sync_to_airtable)
    logger.info('sync science feedback airtable data...Done.')
