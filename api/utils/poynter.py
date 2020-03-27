import os
from pathlib import Path, PurePath
from pandas import read_csv

from utils.pandas import create_rows_from_data_frame


CLAIMS_DIR = Path(os.path.dirname(os.path.realpath(__file__)))\
              / '..' / 'static' / 'poynter_claims.csv'



def get_claims():
    df = read_csv(CLAIMS_DIR)
    claims = create_rows_from_data_frame(df, index_keys=[])
    print(claims)
    #print(df.loc[0, 'What did you fact-check?'])
    return []

def get_content_with_poynter_result(result):
    content = {
        'text': int(result['What did you fact-check?']),
    }

    return content
