from datetime import datetime, timedelta
from repository.articles import sync_articles


def create_clock_sync_articles(from_date_minutes, to_date_minutes):
    def clock_sync_articles():
        now_date = datetime.utcnow()
        sync_articles(
            now_date - timedelta(minutes=from_date_minutes),
            now_date - timedelta(minutes=to_date_minutes)
        )
    return clock_sync_articles


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

jobs = []

for clock_sync_article_config in clock_sync_article_configs:
    from_date = clock_sync_article_config['from_date']
    to_date = clock_sync_article_config['to_date']
    jobs.append({
        'function': create_clock_sync_articles(from_date, to_date),
        'kwargs': {
            'id': 'articles {} {}'.format(from_date, to_date),
            'minute': '*/{}'.format(clock_sync_article_config['frequency'])
        }
    })
