import os
from logging import INFO as LOG_LEVEL_INFO
from pathlib import Path

APP_NAME = os.environ.get('APP_NAME', '')
COMMAND_NAME = os.environ.get('COMMAND_NAME', '')
GIT_TAG = os.environ.get('GIT_TAG', '')
TLD = os.environ.get('TLD', '')

EMAIL_HOST = "{}.{}".format(APP_NAME, TLD)
API_ROOT_PATH = Path(os.path.dirname(os.path.realpath(__file__))) / '..'
BROWSER_URL = os.environ.get('BROWSER_URL', 'http://localhost:3000')
ENV = os.environ.get('ENV', 'development')
IS_DEVELOPMENT = ENV == 'development'
IS_INTEGRATION = ENV == 'integration'
IS_STAGING = ENV == 'staging'
IS_PRODUCTIONUCTION = ENV == 'production'
LOG_LEVEL = int(os.environ.get('LOG_LEVEL', LOG_LEVEL_INFO))

if IS_DEVELOPMENT:
    API_URL = 'localhost'
elif IS_PRODUCTION:
    API_URL = 'https://backend.{}.{}'.format(APP_NAME, TLD)
else:
    API_URL = 'https://backend-{}.{}.{}'.format(ENV, APP_NAME, TLD)
