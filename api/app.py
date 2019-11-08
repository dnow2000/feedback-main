import os
from flask_cors import CORS
from flask_login import LoginManager
from flask import Flask
from sqlalchemy_api_handler import ApiHandler

from models.utils import import_models
from models.utils.db import db
from models.utils.install import install_models
from routes.utils import import_routes
from utils.config import IS_DEV

flask_app = Flask(__name__, static_url_path='/static')

flask_app.secret_key = os.environ.get('FLASK_SECRET', '+%+5Q83!abR+-Dp@')
flask_app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('POSTGRES_URL')
flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
flask_app.config['SESSION_COOKIE_HTTPONLY'] = True
flask_app.config['SESSION_COOKIE_SECURE'] = False if IS_DEV else True
flask_app.config['REMEMBER_COOKIE_DURATION'] = 90 * 24 * 3600
flask_app.config['PERMANENT_SESSION_LIFETIME'] = 90 * 24 * 3600
flask_app.config['REMEMBER_COOKIE_HTTPONLY'] = True
flask_app.config['REMEMBER_COOKIE_SECURE'] = True

login_manager = LoginManager()
login_manager.init_app(flask_app)
db.init_app(flask_app)
ApiHandler.set_db(db)

@flask_app.teardown_request
def remove_db_session(exc):
    try:
        db.session.remove()
    except AttributeError:
        pass
cors = CORS(flask_app,
            resources={r"/*": {"origins": "*"}},
            supports_credentials=True)
flask_app.url_map.strict_slashes = False

flask_app.app_context().push()
import_models()
if IS_DEV:
    install_models()
import utils.login_manager
import utils.nltk_downloader
import_routes()

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    flask_app.run(host="0.0.0.0", port=port, debug=IS_DEV, use_reloader=True)
