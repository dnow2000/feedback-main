import os
import celery

from tasks import import_tasks


celery_app = celery.Celery(
    f'{os.environ.get("APP_NAME")}-jobs',
    broker=os.environ.get('REDIS_URL'),
    backend=os.environ.get('REDIS_URL')
)

import_tasks()
