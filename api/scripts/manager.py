import os
from flask_script import Manager
from flask import Flask
from sqlalchemy_api_handler import ApiHandler

from models.utils.db import db

flask_app = Flask(__name__)

flask_app.secret_key = os.environ.get('FLASK_SECRET', '+%+3Q23!zbc+!Dd@')
flask_app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('POSTGRES_URL')
flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(flask_app)
ApiHandler.set_db(db)

def create_app(env=None):
    flask_app.env = env
    return flask_app

flask_app.manager = Manager(create_app)

flask_app.app_context().push()
import scripts

if __name__ == "__main__":
    flask_app.manager.run()
