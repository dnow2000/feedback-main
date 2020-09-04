import os
from sqlalchemy_api_handler import logger
import requests

CROWDTANGLE_API_URL = 'https://api.crowdtangle.com'
CROWDTANGLE_API_KEY = os.environ.get('CROWDTANGLE_API_KEY')

if CROWDTANGLE_API_KEY is None:
    logger.warning('CROWDTANGLE_API_KEY is not defined in the env!')


def clean_results_from_crowdtangle(result):
    return


def crowdtangle_from_url(shared_url, request_start_date):

    params = {
        'count': 1000,
        'link': shared_url,
        'sortBy': 'total_interactions',
        'startDate': request_start_date,
        'token': CROWDTANGLE_API_KEY
    }

    api_end_point = 'links'

    response = requests.get(
        '{}/{}'.format(CROWDTANGLE_API_URL, api_end_point), 
        params
    )
    response = response.json()

    if 'result' not in response:
        return {}

    # TODO: clean the response

    return response['result']
    