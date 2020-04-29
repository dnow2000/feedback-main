from jobs.article import jobs as article_jobs
from jobs.science_feedback import science_feedback_jobs
from jobs.user import jobs as user_jobs


jobs = article_jobs \
       + user_jobs  \
       + science_feedback_jobs
