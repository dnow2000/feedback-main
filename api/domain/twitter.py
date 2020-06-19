import requests

BUZZSUMO_API_KEY = os.environ.get('BUZZSUMO_API_KEY')
BUZZSUMO_API_URL = 'http://api.buzzsumo.com/search'


def tweets_from_name_and_quoted_url():