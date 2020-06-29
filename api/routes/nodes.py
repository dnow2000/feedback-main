import inflect
from flask import current_app as app, jsonify
from sqlalchemy_api_handler import ApiHandler, \
                                   as_dict, \
                                   load_or_404

from models.verdict import Verdict
from utils.db import get_model_with_table_name


@app.route('/nodes', methods=['GET'])
def get_nodes():
    entity = Verdict.query.first()
    return jsonify(as_dict(entity))


@app.route('/nodes/<collection_name>/<entity_id>', methods=['GET'])
def get_node(collection_name, entity_id):
    table_name = inflect.engine().singular_noun(collection_name)
    model = get_model_with_table_name(table_name)
    entity = load_or_404(model, entity_id)
    return jsonify(as_dict(entity)), 200
