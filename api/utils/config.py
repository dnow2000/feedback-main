import os
from logging import INFO as LOG_LEVEL_INFO
from pathlib import Path


APP_NAME = os.environ.get('APP_NAME', '')
COMMAND_NAME = os.environ.get('COMMAND_NAME', '')
MODE = os.environ.get('MODE', 'serve-development')
PORT = int(os.environ.get('PORT', 5000))
TLD = os.environ.get('TLD', '')
WEBAPP_SUBDOMAIN = os.environ.get('WEBAPP_SUBDOMAIN', '')

API_ROOT_PATH = Path(os.path.dirname(os.path.realpath(__file__))) / '..'

VERSION_FILE = open(os.path.join(API_ROOT_PATH, 'version.txt'), 'r')
VERSION = VERSION_FILE.read().rstrip()
VERSION_FILE.close()

MACHINE_ENV = os.environ.get('MACHINE_ENV', 'development')
IS_DEVELOPMENT = MACHINE_ENV == 'development'
IS_PRODUCTION = MACHINE_ENV == 'production'

LOG_LEVEL = int(os.environ.get('LOG_LEVEL', LOG_LEVEL_INFO))

if IS_DEVELOPMENT:
    API_URL = 'http://api-{}:{}'.format(MODE, PORT)
    WEBAPP_URL = 'http://localhost:3000'
elif IS_PRODUCTION:
    API_URL = 'https://api.{}.{}'.format(APP_NAME, TLD)
    WEBAPP_URL = 'https://{}.{}.{}'.format(WEBAPP_SUBDOMAIN, APP_NAME, TLD)
else:
    API_URL = 'https://api-{}.{}.{}'.format(MACHINE_ENV, APP_NAME, TLD)
    WEBAPP_URL = 'https://{}.{}.{}'.format(WEBAPP_SUBDOMAIN, APP_NAME, TLD)

DEFAULT_USER_PASSWORD = os.environ.get('DEFAULT_USER_PASSWORD', '')
