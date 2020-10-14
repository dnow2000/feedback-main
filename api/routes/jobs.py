import json
from glob import glob
from flask import current_app as app, jsonify, url_for

from celery_worker import hello_world
from utils.jobs import JOBS_PATH


@app.route('/jobs')
def get_all_jobs():
    jobs_files = glob(f'{JOBS_PATH}/*.json')
    if not jobs_files:
        return jsonify({'jobs': 'no jobs active'}), 404

    jobs_files.sort()
    jobs = open(jobs_files[-1], 'r')
    jobs_str = jobs.read()
    jobs.close()
    if not jobs_str:
        return jsonify({'jobs': 'jobs content is empty'})

    latest = json.loads(jobs_str)
    return jsonify(latest)


@app.route('/jobs/hello_world', methods=['POST'])
def hello_world_job():
    try:
        task = hello_world.delay('Quan')
        result = task.wait()
        return jsonify(result)
    except Exception as e:
        return jsonify(f'Exception: {e}'), 500


@app.route('/jobs/taskstatus/<task_id>', methods=['GET'])
def task_status(task_id):
    task = hello_world.AsyncResult(task_id)
    return jsonify(task)
