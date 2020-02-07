import os
from datetime import datetime
from sqlalchemy_api_handler import logger
from urllib.parse import urlencode

from utils.date import strftime

BUZZSUMO_API_KEY = os.environ.get('BUZZSUMO_API_KEY')
BUZZSUMO_API_URL = "http://api.buzzsumo.com/search"

if BUZZSUMO_API_KEY is None:
    logger.warning('BUZZSUMO_API_KEY is not defined in the env')

def get_buzzsumo_url(buzzsumo_api_name, url_query):
    url_query_with_credentials = dict(
        url_query,
        **{ 'api_key': BUZZSUMO_API_KEY }
    )

    url_location_search_with_credentials = urlencode(url_query_with_credentials)

    url = "{}/{}.json?{}".format(
        BUZZSUMO_API_URL,
        buzzsumo_api_name,
        url_location_search_with_credentials
    )

    return url

def get_content_with_buzzsumo_result(result):
    content = {
        'buzzsumoId': int(result['id']),
        'externalThumbUrl': result['thumbnail'],
        'facebookShares': result['total_facebook_shares'],
        'publishedDate': strftime(datetime.utcfromtimestamp(result['published_date'])),
        'subdomain': result['subdomain'],
        'title': result['title'],
        'totalShares': result['total_shares'],
        'twitterShares': result['twitter_shares'],
        'url': result.get('og_url', '')
    }

    return content
