from repository.science_feedback import sync


JOBS = [{
    'function': sync,
    'kwargs': {
        'id': 'science_feedback_airtable',
        'hour': '*/1',
        'minute': '1'
    }
}]
