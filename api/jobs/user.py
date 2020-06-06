from repository.users import sync


JOBS = [{
    'func': sync,
    'id': 'user',
    'trigger': 'interval',
    'hours': 1
}]
