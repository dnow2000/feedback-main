import os
from logging import INFO as LOG_LEVEL_INFO
from pathlib import Path

APP_NAME = os.environ.get('APP_NAME', '')
COMMAND_NAME = os.environ.get('COMMAND_NAME', '')
MODE = os.environ.get('MODE', 'serve-development')
TLD = os.environ.get('TLD', '')
WEBAPP_SUBDOMAIN = os.environ.get('WEBAPP_SUBDOMAIN', '')

EMAIL_HOST = "{}.{}".format(APP_NAME, TLD)
API_ROOT_PATH = Path(os.path.dirname(os.path.realpath(__file__))) / '..'

version_file = open(os.path.join(API_ROOT_PATH, "version.txt"), "r")
VERSION = version_file.read().rstrip()
version_file.close()

MACHINE_ENV = os.environ.get('MACHINE_ENV', 'development')
IS_DEVELOPMENT = MACHINE_ENV == 'development'
IS_PRODUCTION = MACHINE_ENV == 'production'

LOG_LEVEL = int(os.environ.get('LOG_LEVEL', LOG_LEVEL_INFO))

if IS_DEVELOPMENT:
    API_URL = 'http://localhost:80'
    WEBAPP_URL = 'http://localhost:3000'
elif IS_PRODUCTION:
    API_URL = 'https://api.{}.{}'.format(APP_NAME, TLD)
    WEBAPP_URL = 'https://{}.{}.{}'.format(WEBAPP_SUBDOMAIN, APP_NAME, TLD)
else:
    API_URL = 'https://api-{}.{}.{}'.format(MACHINE_ENV, APP_NAME, TLD)
    WEBAPP_URL = 'https://{}.{}.{}'.format(WEBAPP_SUBDOMAIN, APP_NAME, TLD)
