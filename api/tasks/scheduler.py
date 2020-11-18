from celery.schedules import crontab


def setup_scheduler_from(celery_app):
    celery_app.conf.beat_schedule = {
        '1': {
            'kwargs': {
                'formula': 'FIND("Out of sync", {Sync status})>0'
            },
            'task': 'tasks.science_feedback.sync_with_rows',
            'schedule': crontab(minute=15, hour='*/12'),
        },
    }
    celery_app.conf.timezone = 'UTC'
