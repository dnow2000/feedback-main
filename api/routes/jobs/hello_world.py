import os
import requests

from flask import current_app as app, jsonify, redirect, request
from tasks.hello_world import hello_world


@app.route('/jobs/hello_world', methods=['POST'])
def hello_world_job():
    try:
        name = request.args.get('name', 'Feedback')
        task = hello_world.apply_async(args=[name])
        return jsonify({'taks_id': task.id})
    except Exception as e:
        return jsonify(f'Exception: {e}'), 500


@app.route('/jobs/<full_path>')
def jobs_monitor(full_path):
    try:
        flower_url = os.environ.get('FLOWER_URL')
        url = f'{flower_url}/api/{full_path}'
        return jsonify(requests.get(url).json())
    except Exception as e:
        return jsonify(f'Exception: {e}'), 500
