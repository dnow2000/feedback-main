from flask import Flask
import time
import atexit

from utils.setup import setup


FLASK_APP = Flask(__name__)

setup(FLASK_APP, with_jobs=True)

if __name__ == '__main__':
    FLASK_APP.scheduler.start()
    while True:
        time.sleep(1)

    atexit.register(lambda: FLASK_APP.scheduler.shutdown())
