from flask import current_app as app, jsonify
from flask_script import Command
from pprint import pprint
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.serialization import as_dict
from sqlalchemy_api_handler.utils import dehumanize

from domain.graph import graph_from_entity
from models.graph import Graph
from utils.config import COMMAND_NAME


@app.manager.add_command
class GraphCommand(Command):
    __doc__ = ''' e.g. `{} graph claim AM` prints a json graph'''.format(COMMAND_NAME)
    name = 'graph'
    capture_all_args = True

    '''
    def run(self, args):
        model_name = args[0]
        entity_id = args[1]
        model = ApiHandler.model_from_name(model_name.title())
        entity = model.query.get(dehumanize(entity_id))
        graph = graph_from_entity(entity)
        pprint(jsonify(graph).json)
    '''
    def run(self, args):
        model_name = args[0].title()
        entity_id = args[1]
        model = ApiHandler.model_from_name(model_name)
        entity = model.query.get(dehumanize(entity_id))
        graph = Graph(**{args[0]: entity})
        graph.parse()
        pprint(as_dict(graph))
