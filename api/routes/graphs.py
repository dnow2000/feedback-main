import inflect
from flask_login import current_user, login_required
from flask import current_app as app, jsonify
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.utils import load_or_404

from domain.graph import graph_from_entity
from models.verdict import Verdict
from repository.roles import check_user_has_role


@app.route('/graphs', methods=['GET'])
def get_anonymised_graphs():
    graphs = [
        graph_from_entity(entity, is_anonymised=True)
        for entity in Verdict.query.all()[:2]
    ]
    return jsonify(graphs), 200


@app.route('/graphs/<collection_name>/<entity_id>', methods=['GET'])
def get_anonymised_graph(collection_name, entity_id):
    table_name = inflect.engine().singular_noun(collection_name)
    model = ApiHandler.model_from_table_name(table_name)
    entity = load_or_404(model, entity_id)
    graph = graph_from_entity(entity, is_anonymised=True)
    return jsonify(graph), 200


@app.route('/graphs/<collection_name>/<entity_id>', methods=['GET'])
@login_required
def get_graph(collection_name, entity_id):
    table_name = inflect.engine().singular_noun(collection_name)
    model = ApiHandler.model_from_table_name(table_name)
    entity = load_or_404(model, entity_id)
    is_anonymised = not check_user_has_role(current_user, 'INSPECTOR')
    graph = graph_from_entity(entity,
                              is_anonymised=is_anonymised)
    return jsonify(graph), 200
