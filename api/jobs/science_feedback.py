from repository.science_feedback.airtable import sync_outdated_rows


JOBS = {
    'async': [
        {
            'func': sync_outdated_rows,
            'id': 'sync science_feedback',
            'trigger': 'interval',
            'hours': 1
        }
    ],
    'background': []
}
