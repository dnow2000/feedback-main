import os
from flask import Flask
from sqlalchemy_api_handler import ApiHandler

from models import import_models
from models.utils.db import db

flask_app = Flask(__name__)

flask_app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('POSTGRES_URL')
flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(flask_app)
ApiHandler.set_db(db)

flask_app.app_context().push()
import_models()
