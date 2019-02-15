import os
from flask_cors import CORS
from flask_login import LoginManager
from flask import Flask 

from models.utils.db import db
from utils.config import IS_DEV

app = Flask(__name__, static_url_path='/static')
login_manager = LoginManager()

app.secret_key = os.environ.get('FLASK_SECRET', '+%+5Q83!abR+-Dp@')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('POSTGRES_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SECURE'] = False if IS_DEV else True
app.config['REMEMBER_COOKIE_DURATION'] = 90 * 24 * 3600
app.config['PERMANENT_SESSION_LIFETIME'] = 90 * 24 * 3600
app.config['REMEMBER_COOKIE_HTTPONLY'] = True
app.config['REMEMBER_COOKIE_SECURE'] = True

db.init_app(app)

login_manager.init_app(app)

cors = CORS(app,
            resources={r"/*": {"origins": "*"}},
            supports_credentials=True)

# make Werkzeug match routing rules with or without a trailing slash
app.url_map.strict_slashes = False

with app.app_context():
    from models.utils.install_models import install_models
    install_models()
    import utils.login_manager
    import utils.nltk_downloader
    import routes

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=IS_DEV, use_reloader=True)
