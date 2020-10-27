from flask import current_app as app, jsonify, request
from tasks import task_as_dict
from tasks.hello_world import hello_world


@app.route('/jobs/hello_world', methods=['POST'])
def hello_world_job():
    try:
        name = request.args.get('name', 'Feedback')
        task = task_as_dict(hello_world, name)
        return jsonify(task)
    except Exception as e:
        return jsonify(f'Exception: {e}'), 500
