import os
import pytest
from flask import Flask
from flask_login import LoginManager
from sqlalchemy_api_handler import ApiHandler

from models.utils.db import db
from models.utils.install import install_models
from routes.utils.install import install_routes


items_by_category = {'first': [], 'last': []}

def _sort_alphabetically(category):
    return sorted(items_by_category[category], key=lambda item: item.location)


def pytest_collection_modifyitems(config, items):
    """
    This function can be deleted once the tests are truly order-independent.
    :param items: Test items parsed by pytest, available for sorting
    """
    for item in items:
        if 'standalone' in item.keywords:
            items_by_category['last'].append(item)
        else:
            items_by_category['first'].append(item)

    print('\n************************************************************')
    print('*                                                          *')
    print('*  %s tests are still depending on the execution order     *' % len(items_by_category['first']))
    print('*                                                          *')
    print('************************************************************')
    items[:] = _sort_alphabetically('first') + _sort_alphabetically('last')


@pytest.fixture(scope='session')
def app():
    flask_app = Flask(__name__)

    flask_app.config['SECRET_KEY'] = 'T5-5-3Yga;h;SAf2u3i'
    flask_app.config['REMEMBER_COOKIE_HTTPONLY'] = False
    flask_app.config['SESSION_COOKIE_HTTPONLY'] = False
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('POSTGRES_URL')
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    flask_app.config['TESTING'] = True

    login_manager = LoginManager()
    login_manager.init_app(flask_app)
    db.init_app(flask_app)
    ApiHandler.set_db(db)

    flask_app.app_context().push()
    install_models()
    import utils.login_manager
    install_routes()

    return flask_app
