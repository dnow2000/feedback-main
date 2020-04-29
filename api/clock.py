import os
from flask import Flask
from sqlalchemy_api_handler import ApiHandler
from apscheduler.schedulers.blocking import BlockingScheduler

from jobs import jobs
from models.utils.db import db


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('POSTGRES_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = True
db.init_app(app)
ApiHandler.set_db(db)
db.app = app


if __name__ == '__main__':
    scheduler = BlockingScheduler()

    for job in jobs:
        scheduler.add_job(
            job['function'],
            'cron',
            **job['kwargs']
        )

    scheduler.start()
