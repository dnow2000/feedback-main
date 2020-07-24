from repository.users import sync


JOBS = [{
    'func': sync,
    'id': 'sync user',
    'trigger': 'interval',
    'hours': 1
}]
