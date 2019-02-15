import os
from logging import INFO as LOG_LEVEL_INFO
from pathlib import Path

APP_NAME = "sciencefeedback"
COMMAND_NAME = "sf"
TLD = "co"

EMAIL_HOST = "{}.{}".format(APP_NAME, TLD)
FLASK_ROOT_PATH = Path(os.path.dirname(os.path.realpath(__file__))) / '..'
BROWSER_URL = os.environ.get('BROWSER_URL', 'http://localhost:3000')
ENV = os.environ.get('ENV', 'development')
IS_DEV = ENV == 'development'
IS_STAGING = ENV == 'staging'
IS_PROD = ENV == 'production'
LOG_LEVEL = int(os.environ.get('LOG_LEVEL', LOG_LEVEL_INFO))

if IS_DEV:
    API_URL = 'localhost'
elif IS_PROD:
    API_URL = 'https://backend.{}.{}'.format(APP_NAME, TLD)
else:
    API_URL = 'https://backend-{}.{}.{}'.format(ENV, APP_NAME, TLD)
