import os


broker_url = os.environ.get('REDIS_URL')
result_backend = os.environ.get('REDIS_URL')

'''
tasks_routes = {
    'hello.*': {
        'queue': 'try',
    }
}
'''
