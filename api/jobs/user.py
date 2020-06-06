from repository.users import sync


JOBS = [{
    'function': sync,
    'kwargs': {
        'id': 'user',
        'hour': '*/1',
        'minute': '1'
    }
}]
