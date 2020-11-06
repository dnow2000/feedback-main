from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler.serialization import as_dict

from tasks.science_feedback import sync_airtable, sync_outdated_rows
from utils.celery import task_as_dict


@app.route('/jobs/sync/science_feedback/<sync_type>', methods=['POST'])
def sync_science_feedback(sync_type):
    if sync_type == 'outdated_rows':
        task = task_as_dict(sync_outdated_rows)

    elif sync_type == 'airtable':
        sync_to_airtable = eval(request.args.get('sync_to_airtable', 'False'))
        task = task_as_dict(sync_airtable, sync_to_airtable=sync_to_airtable)

    return jsonify(task)
