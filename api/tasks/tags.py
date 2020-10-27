import os

from celery_worker import celery_app
from repository.tags import sync as sync_tags

from flask import Flask
from sqlalchemy_api_handler import ApiHandler
from utils.database import db
from models import import_models


@celery_app.task(bind=True, name='sync_tags')
def sync_tags_task(self):
    flask_app = Flask(__name__)
    flask_app.secret_key = os.environ.get('FLASK_SECRET', '+%+5Q83!abR+-Dp@')
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('POSTGRES_URL')
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = flask_app
    db.init_app(flask_app)
    ApiHandler.set_db(db)
    with flask_app.app_context():
        import_models()
        sync_tags()
