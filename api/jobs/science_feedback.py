from repository.science_feedback import sync


jobs = [{
    'function': sync,
    'kwargs': {
        'id': 'science_feedback_airtable',
        'minute': '*/60'
    }
}]
