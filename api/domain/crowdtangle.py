import os

import requests
from sqlalchemy_api_handler import logger


CROWDTANGLE_API_URL = 'https://api.crowdtangle.com'
CROWDTANGLE_API_KEY = os.environ.get('CROWDTANGLE_API_KEY')

if CROWDTANGLE_API_KEY is None:
    logger.warning('CROWDTANGLE_API_KEY is not defined in the env!')


def clean_results_from_crowdtangle(result, shared_url):

    clean_response = {
        'link': shared_url,
        'shares': []
    }

    for post in result['posts']:
        clean_response['shares'].append({
            'post': {
                'url': post['postUrl'],
                'publishedDate': post['date']
            },
            'group': {
                'name': post['account']['name'],
                'url': post['account']['url'],
                'logoUrl': post['account']['profileImage']
            }
        })
    
    return clean_response


def get_crowdtangle_data_from_url(shared_url, request_start_date):

    params = {
        'count': 1000,
        #'includeHistory': 'true',
        'link': shared_url,
        'platforms': 'facebook',
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

    return clean_results_from_crowdtangle(response['result'], shared_url)
    