import json
import os
from datetime import datetime
from glob import glob
from sqlalchemy_api_handler import logger

from utils.time import str_from_timedelta
from utils.tmp import TMP_PATH


def _construct_job_obj(job):
    job_obj = {}
    job_obj['id'] = job.id
    job_obj['name'] = job.name
    job_obj['next_run'] = str(job.next_run_time)
    job_obj['trigger'] = str_from_timedelta(job.trigger.interval)
    return job_obj


def get_all_jobs(app):
    async_jobs = app.async_scheduler.get_jobs()
    background_jobs = app.background_scheduler.get_jobs()
    jobs = {'async': [], 'background': [], 'time_recorded': None}

    for job in async_jobs:
        jobs['async'].append(_construct_job_obj(job))
    for job in background_jobs:
        jobs['background'].append(_construct_job_obj(job))
    jobs['time_recorded'] = datetime.now().isoformat()

    return jobs


def write_jobs_to_file(jobs):
    jobs_str = json.dumps(jobs)
    current_time = datetime.now().isoformat()
    if not os.path.exists(TMP_PATH):
        os.makedirs(TMP_PATH)

    job_file = open(f'{TMP_PATH}/jobs/jobs_{current_time}.json', 'w')
    logger.info(f'writing jobs {jobs_str} to file {job_file}')
    job_file.write(jobs_str)
    job_file.close()


def remove_oldest_jobs_file(file_limit=5):
    jobs_files = glob(f'{TMP_PATH}/jobs/jobs_*.json')
    jobs_files.sort()
    if len(jobs_files) > file_limit:
        os.remove(jobs_files[0])
