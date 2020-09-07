from repository.users import sync


JOBS = {
    'async': [],
    'background': [
        {
            'func': sync,
            'id': 'sync user',
            'trigger': 'interval',
            'hours': 1
        }
    ]
}
