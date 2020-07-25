import inflect
from flask import current_app as app, jsonify
from sqlalchemy_api_handler import ApiHandler, \
                                   as_dict, \
                                   load_or_404

from domain.graph import graph_from_entity
from models.verdict import Verdict


@app.route('/graphs', methods=['GET'])
def get_graphs():
    graphs = [
        graph_from_entity(entity)
        for entity in Verdict.query.all()[:2]
    ]
    return jsonify(graphs)


@app.route('/graphs/<collection_name>/<entity_id>', methods=['GET'])
def get_graph(collection_name, entity_id):
    table_name = inflect.engine().singular_noun(collection_name)
    model = ApiHandler.model_from_table_name(table_name)
    entity = load_or_404(model, entity_id)
    graph = graph_from_entity(entity)
    return jsonify(graph), 200
