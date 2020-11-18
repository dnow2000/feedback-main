# pylint: disable=C0415
import os
import sys
import requests
from datetime import datetime
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.utils import logger

from repository.science_feedback.airtable.config import NAME_TO_AIRTABLE
from utils.airtable import request_airtable_rows


def entity_from_row_for(name, entity_dict, index):
    import repository.science_feedback.airtable.entity_from_row as entity_from_row
    function_name = '{}_from_row'.format(name)
    entity_from_row_function = getattr(entity_from_row, function_name)
    return entity_from_row_function(entity_dict, index)


def entity_rows_from_table(name,
                           formula=None,
                           max_records=None,
                           session=None):
    if session is None:
        session = requests.Session()

    rows = request_airtable_rows(SCIENCE_FEEDBACK_AIRTABLE_BASE_ID,
                                 NAME_TO_AIRTABLE[name],
                                 filter_by_formula=formula,
                                 max_records=max_records,
                                 session=session)

    if rows:
        logger.info(f'syncing table {NAME_TO_AIRTABLE[name]}')
    else:
        logger.info(f'nothing to sync for table {NAME_TO_AIRTABLE[name]}')

    for (index, row) in enumerate(rows):
        try:
            row['entity'] = entity_from_row_for(name, row, index)
            if not entity:
                row['Synced time input'] = f'Could not create {name} from row'
        except KeyError as exception:
            logger.warning(f'Error while trying to create entity from row at table {NAME_TO_AIRTABLE[name]}')
            logger.error(f'KeyError {exception}: {row}')
            row['Synced time input'] = f'KeyError {exception}'
        except Exception as exception:
            logger.warning(f'Error while trying to create entity from row at table {NAME_TO_AIRTABLE[name]}')
            logger.error(f'Unexpected error: {exception} - {sys.exc_info()[0]} at {row}')
            row['Synced time input'] = f'Unexpected error: {exception}'

    return rows
