import os
from pathlib import Path, PurePath
from pandas import read_csv
import sys

from utils.config import IS_DEVELOPMENT
from utils.google.drive import find_file_from_name, \
                               get_file_media
from utils.pandas import create_rows_from_data_frame


GOOGLE_DRIVE_ID = os.environ.get('DATA_GOOGLE_DRIVE_ID')
GOOGLE_SERVICE_ACCOUNT_CREDENTIALS = os.environ.get("DATA_GOOGLE_SERVICE_ACCOUNT_CREDENTIALS") \
                                   .replace('\'', '')

DEVELOPMENT_POYNTER_CLAIMS_DIR = Path(os.path.dirname(os.path.realpath(__file__)))\
              / '..' / '..' / 'static' / 'poynter_claims.csv'


def load_data_frame():
    filepath_or_buffer = None
    if IS_DEVELOPMENT:
        filepath_or_buffer = DEVELOPMENT_POYNTER_CLAIMS_DIR
    else:
        file = find_file_from_name(
            'poynter_claims.csv',
            drive_id=GOOGLE_DRIVE_ID,
            parent_folder_id=GOOGLE_DRIVE_ID,
            service_account_string=GOOGLE_SERVICE_ACCOUNT_CREDENTIALS
        )
        filepath_or_buffer = get_file_media(
            file.get('id'),
            service_account_string=GOOGLE_SERVICE_ACCOUNT_CREDENTIALS
        )
    setattr(sys.modules[__name__], 'df', read_csv(filepath_or_buffer))


def claim_from_poynter(datum, index):
    return {
        'type': 'claim',
        'sourceId': 'poynter-{}'.format(index),
        'text': datum['What did you fact-check?']
    }


def find_poynter_trendings(
    days=1,
    max_trendings=3,
    min_shares=10000,
    theme=None,
):
    df = getattr(sys.modules[__name__], 'df')
    return [
        claim_from_poynter(row, index)
        for (index, row) in enumerate(create_rows_from_data_frame(df, index_keys='id'))
    ]


def get_poynter_trending(id):
    df = getattr(sys.modules[__name__], 'df')
    return claim_from_poynter(df.loc[id])
