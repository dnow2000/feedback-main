import os
from time import sleep

from datetime import datetime
import requests
from sqlalchemy_api_handler import logger


CROWDTANGLE_API_URL = 'https://api.crowdtangle.com'
CROWDTANGLE_API_KEY = os.environ.get('CROWDTANGLE_API_KEY')

if CROWDTANGLE_API_KEY is None:
    logger.warning('CROWDTANGLE_API_KEY is not defined in the env!')


def shares_from_url(url, request_start_date):

    params = {
        'count': 1000,
        # 'includeHistory': 'true',
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
    ).json()

    shares = []
    if response['status'] == 200:
        if not response.get('result'):
            logger.warning('Crowdtangle data returned is empty.')
            return shares

        for post in response['result']['posts']:
            account = post['account']
            summary = post.get('message') or post.get('description')
            title = post.get('title')
            shares.append({
                'account': {
                    'crowdtangleIdentifier': str(account['id']),
                    'facebookIdentifier': str(account['platformId']),
                    'logoUrl': account['profileImage'],
                    'name': account['name'],
                    'url': account['url']
                },
                'post': {
                    'crowdtangleIdentifier': str(post['id']),
                    'facebookIdentifier': str(post['platformId']),
                    'publishedDate': datetime.strptime(post['date'], '%Y-%m-%d %H:%M:%S'),
                    'summary': summary,
                    'totalShares': sum(post['statistics']['actual'].values()),
                    'title': title,
                    'url': post['postUrl']
                },
                'interactions': {
                    'details': post['statistics']['actual'],
                    'total': sum(post['statistics']['actual'].values())
                },
                'platform': post['platform']
            })
    else:
        logger.error(f'Error in fetching from Crowdtangle: {response.get("message", "Unknown exception.")}')
        logger.warning('Returning empty interaction data')

    sleep(30)
    return shares
