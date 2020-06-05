from repository.users import sync


JOBS = [{
    'function': sync,
    'kwargs': {
        'id': 'user',
        'minute': '*/60'
    }
}]
