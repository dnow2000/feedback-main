import inflect
from flask_login import current_user, login_required
from flask import current_app as app, jsonify
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.serialization import as_dict
from sqlalchemy_api_handler.utils import load_or_404

from models.verdict import Verdict
from repository.roles import check_user_has_role


@app.route('/graphs/<model_name>/<entity_id>', methods=['GET'])
def get_anonymised_graph(model_name, entity_id):
    model = ApiHandler.model_from_name(model_name)
    entity = load_or_404(model, entity_id)
    graph = Graph.create_or_modify({
        '__SEARCH_BY__' : ['entityId', 'isAnonymised', 'modelName'],
        'entityId': entity_id,
        'modelName': model_name,
        'isAnonymised': True
    })
    if not graph.nodes:
        graph.parse()
    return jsonify(as_dict(graph)), 200


@app.route('/graphs/<model_name>/<entity_id>', methods=['GET'])
@login_required
def get_graph(model_name, entity_id):
    model = ApiHandler.model_from_name(model_name)
    entity = load_or_404(model, entity_id)
    is_anonymised = not check_user_has_role(current_user, 'INSPECTOR')
    graph = Graph.create_or_modify({
        '__SEARCH_BY__' : ['entityId', 'isAnonymised', 'modelName'],
        'entityId': entity_id,
        'modelName': model_name,
        'isAnonymised': is_anonymised
    })
    if not graph.nodes:
        graph.parse()
    return jsonify(graph), 200
