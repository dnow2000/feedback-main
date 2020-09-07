from flask import Flask
import time
import atexit

from utils.setup import setup


FLASK_APP = Flask(__name__)

setup(FLASK_APP, with_jobs=True)

if __name__ == '__main__':
    FLASK_APP.async_scheduler.start()
    # FLASK_APP.background_scheduler.start()
    atexit.register(lambda: FLASK_APP.async_scheduler.shutdown())
    while True:
        time.sleep(1)
