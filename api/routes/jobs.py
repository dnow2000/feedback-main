from flask import current_app as app, jsonify
from sqlalchemy_api_handler import as_dict, logger


@app.route('/jobs', methods=['GET'])
def get_all_jobs():
    logger.info('Looking for jobs...')
    async_jobs = app.async_scheduler.get_jobs()
    background_jobs = app.background_scheduler.get_jobs()
    jobs = {'async_jobs': [], 'background': []}
    for job in async_jobs:
        jobs['async_jobs'].append({'id': job.id, 'name': job.name})
    for job in background_jobs:
        jobs['background_jobs'].append({'id': job.id, 'name': job.name})
    return jsonify(jobs)
