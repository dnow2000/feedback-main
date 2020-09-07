from flask import Flask
import time
import atexit

from routes import import_clock_routes
from utils.config import IS_DEVELOPMENT
from utils.setup import setup


FLASK_APP = Flask(__name__)

setup(FLASK_APP, with_jobs=True)

if __name__ == '__main__':
    FLASK_APP.async_scheduler.start()
    # FLASK_APP.background_scheduler.start()
    atexit.register(lambda: FLASK_APP.async_scheduler.shutdown())

    import_clock_routes()

    FLASK_APP.run(debug=IS_DEVELOPMENT,
                  host='0.0.0.0',
                  port=5001,
                  use_reloader=True)
