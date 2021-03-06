from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.serialization import as_dict

from domain.wikidata import wikidata_from
from models.organization import Organization
from utils.rest import expect_json_data


@app.route('/organizations', methods=['POST'])
@expect_json_data
def create_organization():

    content = dict(wikidata_from(request.json['name']))

    organization = Organization.create_or_modify(content, 'entity')

    ApiHandler.save(organization)

    return jsonify(as_dict(organization)), 201
