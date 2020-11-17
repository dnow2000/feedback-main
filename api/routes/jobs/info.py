from flask import current_app as app, jsonify, request

from celery_worker import celery_app


@app.route('/jobs/info/<info_type>')
def workers_info(info_type):
    if info_type in (
        'active_queues',
        'conf',
        'ping',
        'query_task',
        'stats',
        'timeout'
    ):
        try:
            insp = celery_app.control.inspect()
            info = getattr(insp, info_type)()
            return jsonify(info)
        except Exception as e:
            return jsonify({'Exception': str(e)}), 500
    else:
        return jsonify({'Error': f'Could not find the info of type: "{info_type}"'}), 404
