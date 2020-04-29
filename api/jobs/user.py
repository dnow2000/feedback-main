from repository.users import sync

jobs = [{
    'function': sync,
    'kwargs': {
        'id': 'user',
        'minute': '*/60'
    }
}]
