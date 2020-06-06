from datetime import datetime
from apscheduler.triggers.date import DateTrigger

from repository.science_feedback import sync


JOBS = [{
    'func': sync,
    'id': 'science_feedback_airtable',
    #'trigger': DateTrigger(run_date=datetime.now()),
    'trigger': 'interval',
    'hours': 1
}]
