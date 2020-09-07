# pylint: disable=C0415
from jobs.content import JOBS as content_jobs
from jobs.science_feedback import JOBS as science_feedback_jobs
from jobs.user import JOBS as user_jobs


def import_async_jobs():
    jobs = []
    # jobs += content_jobs['async']
    # jobs += user_jobs['async']
    jobs += science_feedback_jobs['async']

    return jobs


def import_background_jobs():
    jobs = []
    # jobs += content_jobs['background']
    # jobs += user_jobs['background']
    # jobs += science_feedback_jobs['background']

    return jobs
