import inflect
from flask_login import current_user, login_required
from flask import current_app as app, jsonify
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.serialization import as_dict
from sqlalchemy_api_handler.utils import load_or_404

from models.graph import Graph
from repository.roles import check_user_has_role


@login_required
@app.route('/graphs/<id_key>/<entity_id>', methods=['GET'])
def get_graph(id_key, entity_id):
    is_anonymised = not check_user_has_role(current_user, 'INSPECTOR')
    graph = Graph.create_or_modify({
        '__SEARCH_BY__' : [id_key, 'isAnonymized'],
        id_key: entity_id,
        'isAnonymized': is_anonymised
    })
    if not graph.nodes:
        graph.parse()
        ApiHandler.save(graph)
    return jsonify(as_dict(graph)), 200


@app.route('/graphs/<id_key>/<entity_id>/anonymized', methods=['GET'])
def get_anonymized_graph(id_key, entity_id):
    graph = Graph.create_or_modify({
        '__SEARCH_BY__' : [id_key, 'isAnonymized'],
        id_key: entity_id,
        'isAnonymized': True
    })
    if not graph.nodes:
        graph.parse()
        ApiHandler.save(graph)
    return jsonify(as_dict(graph)), 200
