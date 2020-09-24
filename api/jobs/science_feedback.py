from datetime import datetime, timedelta

from repository.science_feedback.airtable import sync_outdated_rows

JOBS = {
    'async': [],
    'background': [
        {
            'func': sync_outdated_rows,
            'hours': 24,
            'id': 'sync science_feedback',
            'next_run_time': datetime.now() + timedelta(seconds=10),
            'trigger': 'interval'
        }
    ]
}
