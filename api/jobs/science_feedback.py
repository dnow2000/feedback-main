from repository.science_feedback import sync_outdated_rows


JOBS = [{
    'func': sync_outdated_rows,
    'id': 'sync science_feedback',
    'trigger': 'interval',
    'hours': 1
}]
