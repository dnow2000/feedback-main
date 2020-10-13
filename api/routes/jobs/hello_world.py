from flask import current_app as app, jsonify, request
from tasks.hello_world import hello_world


@app.route('/jobs/hello_world', methods=['POST'])
def hello_world_job():
    try:
        name = request.args.get('name', 'Feedback')
        task = hello_world.apply_async(args=[name])
        return jsonify({'taks_id': task.id})
    except Exception as e:
        return jsonify(f'Exception: {e}'), 500
