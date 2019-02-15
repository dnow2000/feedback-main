import os
from flask import Flask
from apscheduler.schedulers.blocking import BlockingScheduler

from models.utils.db import db
from repository.articles import create_clock_sync_articles

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('POSTGRES_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = True
db.init_app(app)
db.app = app

# everything in minutes
clock_sync_article_configs = [
    # articles inserted since 1.7h - 0, do it every 10 minutes
    { 'from_date': 100, 'to_date': 0, 'frequency': 10 },
    # articles inserted since 17h - 1.7h, do it every 1.7h
    { 'from_date': 1000, 'to_date': 100, 'frequency': 100 },
    # articles inserted since 7days - 17h, do it every 7days
    { 'from_date': 10000, 'to_date': 1000, 'frequency': 1000 },
    # articles inserted since 70days - 7days, do it every 70days
    { 'from_date': 100000, 'to_date': 10000, 'frequency': 10000 },
    # articles inserted since start - 70days, do it every 2 years
    { 'from_date': None, 'to_date': 100000, 'frequency': 100000 },
]

if __name__ == '__main__':
    scheduler = BlockingScheduler()

    for clock_sync_article_config in clock_sync_article_configs:
        from_date = clock_sync_article_config['from_date']
        to_date = clock_sync_article_config['to_date']
        scheduler.add_job(
            create_clock_sync_articles(from_date, to_date),
            'cron',
            id='clock_sync_articles_{}_{}'.format(
                from_date, to_date),
            minute='*/{}'.format(clock_sync_article_config['frequency'])
        )

    scheduler.start()
