from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.serialization import as_dict
from sqlalchemy_api_handler.utils import logger

from models.appearance import Appearance
from repository.contents import sync_content
from utils.rest import expect_json_data
from repository.science_feedback.airtable import entity_from_row_for


@app.route('/webhooks/<entity_name>', methods=['POST'])
@expect_json_data
def create_entity_from_row(entity_name):
    try:
        entity = entity_from_row_for(entity_name, request.json, request.json.get('index', request.json.get('airtableId')))
        if entity:
            ApiHandler.save(entity)
            if entity.__class__ == Appearance:
                sync_content(entity.quotingContent)
            return jsonify(as_dict(entity)), 200
        else:
            return jsonify({"error": "couldn't save the entity"}), 500
    except Exception as e:
        logger.error(e)
        return jsonify({
            "exception": "couldn't complete your request",
            "details": e
        }), 500
