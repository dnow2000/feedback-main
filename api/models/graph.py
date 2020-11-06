from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.serialization import as_dict, exclusive_includes_from

from models.mixins.has_graph_mixin import HasGraphMixin
from utils.database import db


MODEL_NAMES = ['Claim', 'Content', 'Review', 'Verdict', 'User']



class Graph(ApiHandler,
            db.Model,
            HasGraphMixin):

    HasGraphMixin.set_entity_columns_and_relations(locals(), MODEL_NAMES)

    def node_dict_from(self, entity):
        node_type = self.node_type_from(entity)

        includes = []

        if node_type == 'Claim':
            includes = ['text']
        elif node_type == 'Content':
            if not self.isAnonymized:
                includes = ['hostname', 'title', 'type']
            else:
                includes = ['type']
        elif node_type == 'Medium':
            if not self.isAnonymized:
                includes = ['name']
        elif node_type == 'Organization':
            includes = ['name']
        elif node_type == 'Platform':
            includes = ['name']
        elif node_type == 'Role':
            includes = ['type']
        elif node_type == 'Tag':
            includes = ['label']
        elif node_type == 'User':
            if not self.isAnonymized:
                includes = ['firstName', 'lastName']
        elif node_type == 'Verdict':
            includes = ['title']

        includes = exclusive_includes_from(entity, includes)
        '''
        for column_key in entity.__mapper__.columns.keys():
            if column_key not in includes:
                includes.append('-{}'.format(column_key))
        '''
        
        return as_dict(entity, includes=includes)

    def is_stop_node(self,
                     entity,
                     depth=None,
                     key=None,
                     parent_entity=None,
                     source_entity=None):
        node_type = self.node_type_from(entity)

        if node_type in [
            'Platform',
            'Role',
            'Verdict'
        ]:
            return True

        if node_type == 'User' and key != 'author':
            return True

        if node_type == 'Medium' and entity.name in ['Climate Feedback', 'Health Feedback', 'Science Feedback']:
            return True

        return False

    def is_valid_node(self,
                      entity,
                      depth=None,
                      key=None,
                      parent_entity=None,
                      source_entity=None):
        node_type = self.node_type_from(entity)

        if node_type in [
            'Appearance',
            'AuthorContent',
            'Graph',
            'Platform',
            'Role',
            'Tag',
            'Verdict',
            'VerdictTag'
        ]:
            return False

        if node_type == 'Content' and entity.type.value == 'post':
            return False

        if node_type == 'User' and key != 'author':
            return False

        return True
