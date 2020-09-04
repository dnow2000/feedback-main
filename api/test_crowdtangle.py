import json
import time

from flask import Flask
from sqlalchemy_api_handler import ApiHandler

from utils.setup import setup
from domain.crowdtangle import shares_from_url
from repository.clean import clean
from repository.crowdtangle import sync_from_content
from models.appearance import Appearance
from models.content import Content
from models.medium import Medium
from models.platform import Platform
from models.user import User

# # ./fb start
# # docker exec -it feedback-api-serve-development bash
# # PYTHONPATH=. python test_crowdtangle.py

# # 0 shares:
# EXAMPLE_URL = 'https://nexusnewsfeed.com/article/geopolitics/as-riots-continue-more-evidence-that-covid-19-narrative-was-fake-news'

# 4 shares:
EXAMPLE_URL = 'https://www.dcclothesline.com/2019/12/24/warning-what-men-need-to-know-before-eating-impossible-whoppers-from-burger-king/'

# # 1 share:
# EXAMPLE_URL = 'https://twitter.com/davidicke/status/1262482651333738500'

# # around 500 shares:
# EXAMPLE_URL = 'https://www.youtube.com/watch?v=nFPeN17PVU8'

FLASK_APP = Flask(__name__)
setup(FLASK_APP)

if __name__ == '__main__':

    clean()

    print('There are {} contents in the database.\n'.format(Content.query.count()))

    content = Content(
        url=EXAMPLE_URL
    )
    ApiHandler.save(content)

    print('There are {} contents in the database.\n'.format(Content.query.count()))

    sync_from_content(content)

    print()
    print('There are {} users in the database.\n'.format(User.query.count()))
    print('There are {} contents in the database.\n'.format(Content.query.count()))
    print('There are {} appearances in the database.\n'.format(Appearance.query.count()))
    print('There are {} media in the database.\n'.format(Medium.query.count()))
    print('There are {} platform in the database.\n'.format(Platform.query.count()))

    time.sleep(60)

    sync_from_content(content)

    print()
    print('There are {} users in the database.\n'.format(User.query.count()))
    print('There are {} contents in the database.\n'.format(Content.query.count()))
    print('There are {} appearances in the database.\n'.format(Appearance.query.count()))
    print('There are {} media in the database.\n'.format(Medium.query.count()))
    print('There are {} platform in the database.\n'.format(Platform.query.count()))

