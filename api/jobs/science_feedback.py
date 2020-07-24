from repository.science_feedback import sync


JOBS = [{
    'func': sync,
    'id': 'sync science_feedback',
    'trigger': 'interval',
    'hours': 1
}]
