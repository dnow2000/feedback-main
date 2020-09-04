import json

from flask import Flask

from utils.setup import setup
from domain.crowdtangle import crowdtangle_from_url

# ./fb start
# ./fb sandbox
# docker exec -it feedback-api-serve-development bash
# PYTHONPATH=. python test_crowdtangle.py

# # 0 shares:
# EXAMPLE_URL = 'https://nexusnewsfeed.com/article/geopolitics/as-riots-continue-more-evidence-that-covid-19-narrative-was-fake-news'

# 4 shares:
EXAMPLE_URL = 'https://www.dcclothesline.com/2019/12/24/warning-what-men-need-to-know-before-eating-impossible-whoppers-from-burger-king/'

# # around 500 shares:
# EXAMPLE_URL = 'https://www.youtube.com/watch?v=nFPeN17PVU8'

FLASK_APP = Flask(__name__)
setup(FLASK_APP)

if __name__ == '__main__':
    clean_response = crowdtangle_from_url(shared_url=EXAMPLE_URL, request_start_date='2019-09-01')
    print(json.dumps(clean_response, indent=4))
    print()
    print(len(clean_response['shares']))
