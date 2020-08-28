import os

CROWDTANGLE_API_URL = 'https://api.crowdtangle.com'
CROWDTANGLE_API_KEY = os.environ.get('CROWDTANGLE_API_KEY')

def facebook_shares_from_crowdtangle():
    return [CROWDTANGLE_API_URL, CROWDTANGLE_API_KEY]