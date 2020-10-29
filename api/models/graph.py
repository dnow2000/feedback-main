from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.serialization import as_dict

from models.mixins.has_graph_mixin import HasGraphMixin
from utils.database import db


MODEL_NAMES = ['Claim', 'Content']


def print_with_indent(depth):
    def wrapped(*args, **kwargs):
        print("".join(["    "]*depth), *args, **kwargs)
    return wrapped
    

class Graph(ApiHandler,
            db.Model,
            HasGraphMixin):

    HasGraphMixin.set_entity_columns_and_relations(locals(), MODEL_NAMES)

    @classmethod
    def node_dict_from(cls, entity):
        node_type = cls.node_type_from(entity)

        includes = []

        if node_type == 'Claim':
            includes = ['text']
        elif node_type == 'Content':
            includes = ['url']
        elif node_type == 'Medium':
            includes = ['name']
        elif node_type == 'Organization':
            includes = ['name']
        elif node_type == 'Role':
            includes = ['type']
        elif node_type == 'Tag':
            includes = ['label']
        elif node_type == 'User':
            includes = ['firstName', 'lastName']
        elif node_type == 'Verdict':
            includes = ['title']

        for column_key in entity.__mapper__.columns.keys():
            if column_key not in includes:
                includes.append('-{}'.format(column_key))

        return as_dict(entity, includes=includes)

    @classmethod
    def is_stop_node(cls, entity, config):
        node_type = cls.node_type_from(entity)

        if node_type in ['Plaform', 'Role', 'Verdict']:
            return True

        if config['key'] == 'testifier':
            return True

        return False

    @classmethod
    def is_valid_node(cls, entity, config):
        node_type = cls.node_type_from(entity)
        if node_type in ['Appearance', 'AuthorContent', 'Role', 'Verdict']:
            return False

        if config['key'] == 'testifier':
            return False

        return True

    def json_from(self, node):
        json = node
        if self.isAnonymised:
            if node['type'] == 'Medium':
                json = {
                    **node,
                    'datum': {
                        **node['datum'],
                        'name': 'XXX'
                    }
                }
            if node['type'] == 'User':
                json = {
                    **node,
                    'datum': {
                        **node['datum'],
                        'email': 'XXX',
                        'firstName': 'XXX',
                        'lastName': 'XXX'
                    }
                }
        return json
