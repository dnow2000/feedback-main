from sqlalchemy import BigInteger, \
                       Boolean, \
                       Column, \
                       ForeignKey
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import expression
from sqlalchemy import Column
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.serialization import as_dict


def print_with_indent(depth):
    def wrapped(*args, **kwargs):
        print("".join(["    "]*depth), *args, **kwargs)
    return wrapped


class HasGraphMixin(object):
    edges = Column(JSON())

    isAnonymized = Column(Boolean(),
                          default=True,
                          nullable=False,
                          server_default=expression.true())

    nodes = Column(JSON())

    @staticmethod
    def set_entity_columns_and_relations(_locals, model_names):
        for model_name in model_names:
            _locals['{}Id'.format(model_name.lower())] = Column(BigInteger(),
                                                                  ForeignKey('{}.id'.format(model_name.lower())),
                                                                  index=True)
            _locals[model_name.lower()] = relationship(model_name,
                                                         backref='graphs',
                                                         foreign_keys=[_locals['{}Id'.format(model_name.lower())]])

    @property
    def entity(self):
        for relationship_key in self.__mapper__.relationships.keys():
            relationship = getattr(self, relationship_key)
            if relationship:
                return relationship
            id_key = '{}Id'.format(relationship_key)
            entity_id = getattr(self, id_key)
            if entity_id:
                return ApiHandler.model_from_name(relationship_key.title()) \
                                 .query \
                                 .get(entity_id)

    @staticmethod
    def node_type_from(entity):
        return entity.__class__.__name__

    @classmethod
    def node_id_from(cls, entity):
        return '{}_{}'.format(cls.node_type_from(entity), entity.id)

    @classmethod
    def node_dict_from(cls, entity):
        return as_dict(entity)

    @classmethod
    def is_stop_node(cls,
                     entity,
                     depth=None,
                     key=None,
                     parent_entity=None,
                     source_entity=None):
        return False

    @classmethod
    def is_valid_node(cls,
                      entity,
                      depth=None,
                      key=None,
                      parent_entity=None,
                      source_entity=None):
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
              edges=None,
              limit=1000,
              nodes=None,
              parent_entity=None,
              parsed_node_ids=None,
              relationship_key=None,
              source_entity=None,
              validated_node_ids=None):

        if depth == 0:
            edges = []
            nodes = []
            if entity is None:
                entity = self.entity

        if parsed_node_ids is None:
            parsed_node_ids = []

        if validated_node_ids is None:
            validated_node_ids = []

        is_validated = self.is_valid_node(entity,
                                          depth=depth,
                                          key=relationship_key,
                                          parent_entity=parent_entity,
                                          source_entity=source_entity)

        if limit and len(validated_node_ids) > limit:
            if not depth:
                return None
            return is_validated

        node_id = self.node_id_from(entity)
        if node_id not in parsed_node_ids:
            parsed_node_ids.append(node_id)
            if is_validated:
                node = {
                    'datum': self.node_dict_from(entity),
                    'depth': depth,
                    'id': node_id,
                    'type': self.node_type_from(entity)
                }

                source_entity = entity
                validated_node_ids.append(node_id)
                nodes.append(node)

            is_stopped = self.is_stop_node(entity,
                                           depth=depth,
                                           key=relationship_key,
                                           parent_entity=parent_entity,
                                           source_entity=source_entity)
            if is_stopped:
                return is_validated

            for key in entity.__mapper__.relationships.keys():
                sub_entities = getattr(entity, key)
                if not isinstance(sub_entities, list):
                    sub_entities = [sub_entities] if sub_entities is not None else []
                for sub_entity in sub_entities:
                    is_sub_node_validated = self.parse(sub_entity,
                                                       depth=depth + 1,
                                                       edges=edges,
                                                       limit=limit,
                                                       nodes=nodes,
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
                        edges.append(edge)

        if not depth:
            self.edges = edges
            self.nodes = nodes
            return None

        return is_validated
