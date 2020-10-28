from sqlalchemy import BigInteger, \
                       Boolean, \
                       Column, \
                       ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import expression
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.serialization import as_dict

from utils.database import db


MODEL_NAMES = ['Claim', 'Content']


class Graph(ApiHandler,
            db.Model):

    for model_name in MODEL_NAMES:
        locals()['{}Id'.format(model_name.lower())] = Column(BigInteger(),
                                                             ForeignKey('{}.id'.format(model_name.lower())),
                                                             index=True)
        locals()[model_name.lower()] = relationship(model_name,
                                                    backref='graphs',
                                                    foreign_keys=[locals()['{}Id'.format(model_name.lower())]])

    isAnonymized = Column(Boolean(),
                          default=True,
                          nullable=False,
                          server_default=expression.true())

    @property
    def entity(self):
        for relationship_key in self.mappers.keys():
            relationship = getattr(self, relationship_key)
            if relationship:
                return relationship

    @staticmethod
    def node_type_from(entity):
        return entity.__class__.__name__

    @classmethod
    def node_id_from(cls, entity):
        return '{}_{}'.format(cls.node_type_from(entity), entity.id)

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

    def parse(self,
              entity=None,
              depth=0,
              limit=1000,
              parent_entity=None,
              parsed_node_ids=None,
              relationship_key=None,
              source_entity=None,
              validated_node_ids=None):

        if depth == 0:
            self.edges = []
            self.nodes = []
            if entity is None:
                entity = self.entity

        if parsed_node_ids is None:
            parsed_node_ids = []

        if validated_node_ids is None:
            validated_node_ids = []

        is_validated = False
        if limit and len(validated_node_ids) >= limit:
            if not depth:
                return None
            return is_validated

        node_id = self.node_id_from(entity)
        if node_id not in parsed_node_ids:
            parsed_node_ids.append(node_id)
            config = {
                'depth': depth,
                'key': relationship_key,
                'parent': parent_entity,
                'source': source_entity
            }

            is_validated = self.is_valid_node(entity, config)
            if is_validated:
                node = {
                    'datum': self.node_dict_from(entity),
                    'depth': depth,
                    'id': node_id,
                    'type': self.node_type_from(entity)
                }

                source_entity = entity
                validated_node_ids.append(node_id)
                self.nodes.append(node)

            is_stopped = self.is_stop_node(entity, config)
            if is_stopped:
                return is_validated

            for key in entity.__mapper__.relationships.keys():
                sub_entities = getattr(entity, key)
                if not isinstance(sub_entities, list):
                    sub_entities = [sub_entities] if sub_entities is not None else []
                for sub_entity in sub_entities:
                    is_sub_node_validated = self.parse(sub_entity,
                                                       depth=depth + 1,
                                                       limit=limit,
                                                       parent_entity=entity,
                                                       parsed_node_ids=parsed_node_ids,
                                                       relationship_key=key,
                                                       source_entity=source_entity,
                                                       validated_node_ids=validated_node_ids)
                    if is_sub_node_validated:
                        sub_node_id = self.node_id_from(sub_entity)
                        source = node_id if is_validated else self.node_id_from(source_entity)
                        edge = {
                            'id': '{}_{}'.format(source, sub_node_id),
                            'source': source,
                            'target': sub_node_id
                        }
                        self.edges.append(edge)

        if not depth:
            return None
        return is_validated

    __as_dict_includes__ = ['edges', 'nodes']
