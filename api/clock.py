from flask import Flask
import time
import atexit

from routes import import_clock_routes
from utils.config import IS_DEVELOPMENT
from utils.setup import setup


CLOCK_APP = Flask(__name__)

setup(CLOCK_APP, with_jobs=True)

if __name__ == '__main__':
    CLOCK_APP.async_scheduler.start()
    # CLOCK_APP.background_scheduler.start()
    atexit.register(lambda: CLOCK_APP.async_scheduler.shutdown())

    import_clock_routes()

    CLOCK_APP.run(debug=IS_DEVELOPMENT,
                  host='0.0.0.0',
                  port=5001,
                  use_reloader=True)
