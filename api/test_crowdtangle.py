from flask import Flask

from utils.setup import setup
from domain.crowdtangle import crowdtangle_from_url

# ./fb start
# ./fb sandbox
# docker exec -it feedback-api-serve-development bash
# PYTHONPATH=. python test_crowdtangle.py


EXAMPLE_URL = 'https://www.google.com/'

FLASK_APP = Flask(__name__)
setup(FLASK_APP)

if __name__ == '__main__':
    result = crowdtangle_from_url(shared_url=EXAMPLE_URL, request_start_date='2020-08-01')
    print(result['posts'][0])
    print(len(result['posts']))