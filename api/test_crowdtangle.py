from flask import Flask

from utils.setup import setup
from domain.crowdtangle import crowdtangle_from_url

# ./fb start
# ./fb sandbox
# docker exec -it feedback-api-serve-development bash
# PYTHONPATH=. python test_crowdtangle.py

EXAMPLE_URL = 'https://www.youtube.com/watch?v=nFPeN17PVU8'

FLASK_APP = Flask(__name__)
setup(FLASK_APP)

if __name__ == '__main__':
    result = crowdtangle_from_url(shared_url=EXAMPLE_URL, request_start_date='2019-09-01')
    print(len(result['posts']))
