import atexit
import time
from flask import Flask

from utils.jobs import get_all_jobs, write_jobs_to_file, remove_oldest_jobs_file
from utils.setup import setup


CLOCK_APP = Flask(__name__)

setup(CLOCK_APP, with_jobs=True)

if __name__ == '__main__':
    atexit.register(lambda: CLOCK_APP.async_scheduler.shutdown())
    CLOCK_APP.async_scheduler.start()
    # CLOCK_APP.background_scheduler.start()

    while True:
        jobs = get_all_jobs(CLOCK_APP)
        write_jobs_to_file(jobs)
        remove_oldest_jobs_file()
        time.sleep(60)
