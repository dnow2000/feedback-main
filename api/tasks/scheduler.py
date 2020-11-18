from celery.schedules import crontab


def setup_scheduler_from(celery_app):
    celery_app.conf.beat_schedule = {
        'tasks.science_feedback.sync_airtable-every-day': {
            'task': 'tasks.science_feedback.sync_airtable',
            'schedule': crontab(minute=15, hour='*/12'),
        },
    }
    celery_app.conf.timezone = 'UTC'
