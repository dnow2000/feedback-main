import os
from sqlalchemy_api_handler import logger
from urllib.parse import quote_plus
import requests

CROWDTANGLE_API_URL = 'https://api.crowdtangle.com'
CROWDTANGLE_API_KEY = os.environ.get('CROWDTANGLE_API_KEY')

if CROWDTANGLE_API_KEY is None:
    logger.warning('CROWDTANGLE_API_KEY is not defined in the env!')


def clean_results_from_crowdtangle(result):
    return


def crowdtangle_from_url(shared_url, request_start_date):

    # first we url encode the url: 'https://www.google.com/' -> 'https%3A%2F%2Fwww.google.com%2F'
    shared_url = quote_plus(shared_url)

    params = {
        'token': CROWDTANGLE_API_KEY,
        'link': shared_url,
        'startDate': request_start_date,
        'sortBy': 'total_interactions'
    }

    api_end_point = 'links'

    response = requests.get('{}/{}'.format(CROWDTANGLE_API_URL, api_end_point), params)
    response = response.json()

    if 'result' not in response:
        return {}

    # TODO: deal with the pagination
    # TODO: clean the response

    return response['result']
    