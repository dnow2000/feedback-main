import os

import requests
from sqlalchemy_api_handler import logger


CROWDTANGLE_API_URL = 'https://api.crowdtangle.com'
CROWDTANGLE_API_KEY = os.environ.get('CROWDTANGLE_API_KEY')

if CROWDTANGLE_API_KEY is None:
    logger.warning('CROWDTANGLE_API_KEY is not defined in the env!')


def shares_from_url(url, request_start_date):

    params = {
        'count': 1000,
        #'includeHistory': 'true',
        'link': url,
        'platforms': 'facebook',
        'sortBy': 'total_interactions',
        'startDate': request_start_date,
        'token': CROWDTANGLE_API_KEY
    }

    api_endpoint = 'links'

    response = requests.get(
        '{}/{}'.format(CROWDTANGLE_API_URL, api_endpoint),
        params
    )
    response = response.json()

    shares = []
    for post in response['result']['posts']:
        account = post['account']
        shares.append({
            'account': {
                'crowdtangleIdentifier': account['id'],
                'facebookIdentifier': account['platformId'],
                'logoUrl': account['profileImage'],
                'name': account['name'],
                'url': account['url']
            },
            'post': {
                'crowdtangleIdentifier': post['id'],
                'facebookIdentifier': post['platformId'],
                'publishedDate': datetime.strptime(post['date'], '%Y-%m-%d %H:%M:%S'),
                'url': post['postUrl'],
            }
        })

    return shares
