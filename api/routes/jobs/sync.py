from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler.serialization import as_dict

from tasks.science_feedback import sync_airtable_task, sync_outdated_rows_task


@app.route('/jobs/sync/science_feedback/<sync_type>', methods=['POST'])
def sync_science_feedback(sync_type):
    if sync_type == 'outdated_rows':
        task = sync_outdated_rows_task.apply_async(serializer='json')
    elif sync_type == 'airtable':
        sync_to_airtable = eval(request.args.get('sync_to_airtable', False))
        task = sync_airtable_task.apply_async(sync_to_airtable=sync_to_airtable)

    return jsonify({'result': task.get(on_message=print, propagate=False)})
