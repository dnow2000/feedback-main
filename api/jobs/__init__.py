# pylint: disable=C0415


def import_jobs():
    from jobs.content import JOBS as content_jobs
    from jobs.science_feedback import JOBS as science_feedback_jobs
    from jobs.user import JOBS as user_jobs

    jobs = []
    jobs += content_jobs
    jobs += user_jobs
    jobs += science_feedback_jobs

    return jobs
