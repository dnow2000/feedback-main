from datetime import datetime

from repository.science_feedback.airtable import sync_outdated_rows


JOBS = {
    'async': [
        {
            'func': sync_outdated_rows,
            'hours': 12,
            'id': 'sync science_feedback',
            'next_run_time': datetime.now(),
            'trigger': 'interval'
        }
    ],
    'background': []
}
