from flask import Flask
from apscheduler.schedulers.blocking import BlockingScheduler

from jobs import jobs
from utils.setup import setup


FLASK_APP = Flask(__name__)

setup(FLASK_APP)

if __name__ == '__main__':
    SCHEDULER = BlockingScheduler()

    for job in jobs:
        SCHEDULER.add_job(
            job['function'],
            'cron',
            **job['kwargs']
        )

    SCHEDULER.start()
