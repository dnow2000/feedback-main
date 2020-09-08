from flask import current_app as app, jsonify


@app.route('/jobs', methods=['GET'])
def get_all_jobs():
    async_jobs = app.async_scheduler.get_jobs()
    background_jobs = app.background_scheduler.get_jobs()
    jobs = {'async': [], 'background': []}

    for job in async_jobs:
        jobs['async'].append({'id': job.id, 'name': job.name})
    for job in background_jobs:
        jobs['background'].append({'id': job.id, 'name': job.name})

    return jsonify(jobs)
