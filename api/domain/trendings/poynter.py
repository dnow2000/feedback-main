import os
from pathlib import Path, PurePath
from pandas import read_csv

from utils.pandas import create_rows_from_data_frame


POYNTER_CLAIMS_DIR = Path(os.path.dirname(os.path.realpath(__file__)))\
              / '..' / '..' / 'static' / 'poynter_claims.csv'


def claim_from_poynter(datum, index):
    return {
        'sourceId': 'poynter-{}'.format(index),
        'text': datum['What did you fact-check?']
    }


def find_poynter_trendings(
    days=1,
    max_trendings=3,
    min_shares=10000,
    theme=None,
):
    df = read_csv(POYNTER_CLAIMS_DIR)
    return [
        claim_from_poynter(row, index)
        for (index, row) in enumerate(create_rows_from_data_frame(df, index_keys='id'))
    ]


def get_poynter_trending(id):
    df = read_csv(POYNTER_CLAIMS_DIR)
    return claim_from_poynter(df.loc[id])
