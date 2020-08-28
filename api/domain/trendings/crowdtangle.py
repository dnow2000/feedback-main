import os
from sqlalchemy_api_handler import logger

CROWDTANGLE_API_URL = 'https://api.crowdtangle.com'
CROWDTANGLE_API_KEY = os.environ.get('CROWDTANGLE_API_KEY')

if CROWDTANGLE_API_KEY is None:
    logger.warning('CROWDTANGLE_API_KEY is not defined in the env!')

def facebook_shares_from_crowdtangle():
    return [CROWDTANGLE_API_URL, CROWDTANGLE_API_KEY]