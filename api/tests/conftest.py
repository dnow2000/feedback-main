import os
from functools import wraps
import pytest
from flask import Flask

from repository import clean
from models.utils.db import db

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
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('POSTGRES_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    with app.app_context():
        from models.utils.install_models import install_models
        install_models()

    return app


"""
def mocked_mail(f):
    @wraps(f)
    def decorated_function(app, *args, **kwargs):
        app.mailjet_client = Mock(spec=Client)
        app.mailjet_client.send = Mock()
        return f(app, *args, **kwargs)

    return decorated_function
"""

def clean_all_database(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        clean.clean_all_database()
        return f(*args, **kwargs)

    return decorated_function
