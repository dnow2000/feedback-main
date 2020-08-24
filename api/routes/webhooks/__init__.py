from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiHandler, as_dict

from utils.rest import expect_json_data
from repository.science_feedback.airtable import entity_from_row_for, NAME_TO_AIRTABLE


@app.route('/webhooks/<entity_name>', methods=['POST'])
@expect_json_data
def create_entity_from_row(entity_name):
    try:
        entity = entity_from_row_for(entity_name, request.json, None)
        if entity:
            return jsonify(as_dict(entity)), 200
        else:
            return jsonify({"error": "couldn't complete your request"}), 500
    except Exception:
        return jsonify({"exception": "couldn't complete your request"}), 500
