# pylint: disable=C0415
# pylint: disable=W0611
# pylint: disable=W0612
# pylint: disable=W0613

import os
from flask_cors import CORS
from flask_login import LoginManager
from flask_script import Manager
from sqlalchemy_api_handler import ApiHandler

from models import import_models
from routes import import_routes
from scripts import install_scripts
from utils.config import IS_DEVELOPMENT
from utils.db import db


def setup(flask_app,
          with_cors=True,
          with_login_manager=False,
          with_routes=False,
          with_scripts_manager=False,
          with_models_creation=False):

    flask_app.secret_key = os.environ.get('FLASK_SECRET', '+%+5Q83!abR+-Dp@')
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('POSTGRES_URL')
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(flask_app)
    ApiHandler.set_db(db)

    @flask_app.teardown_request
    def remove_db_session(exc):
        try:
            db.session.remove()
        except AttributeError:
            pass

    if with_cors:
        cors = CORS(flask_app,
                    resources={r"/*": {"origins": "*"}},
                    supports_credentials=True)

    flask_app.url_map.strict_slashes = False

    flask_app.app_context().push()
    import_models(with_creation=with_models_creation)

    if with_login_manager:
        flask_app.config['SESSION_COOKIE_HTTPONLY'] = not flask_app.config['TESTING']
        flask_app.config['SESSION_COOKIE_SECURE'] = False if IS_DEVELOPMENT else True
        flask_app.config['REMEMBER_COOKIE_HTTPONLY'] = not flask_app.config['TESTING']
        if not flask_app.config['TESTING']:
            flask_app.config['PERMANENT_SESSION_LIFETIME'] = 90 * 24 * 3600
            flask_app.config['REMEMBER_COOKIE_DURATION'] = 90 * 24 * 3600
            flask_app.config['REMEMBER_COOKIE_SECURE'] = True
        login_manager = LoginManager()
        login_manager.init_app(flask_app)
        import repository.login_manager

    import utils.nltk_downloader

    if with_routes:
        import_routes()

    if with_scripts_manager:
        def create_app(env=None):
            flask_app.env = env
            return flask_app
        flask_app.manager = Manager(create_app)
        install_scripts()
