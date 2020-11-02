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

    def node_type_from(self, entity):
        return entity.__class__.__name__

    def node_id_from(self, entity):
        return '{}_{}'.format(self.node_type_from(entity), entity.id)

    def node_dict_from(self, entity):
        return as_dict(entity)

    def is_stop_node(self,
                     entity,
                     depth=None,
                     key=None,
                     parent_entity=None,
                     source_entity=None):
        return False

    def is_valid_node(self,
                      entity,
                      depth=None,
                      key=None,
                      parent_entity=None,
                      source_entity=None):
        return True

    def parse(self,
              entity=None,
              depth=0,
              edges=None,
              leaves=None,
              limit=1000,
              nodes=None,
              parent_entity=None,
              parsed_node_ids=None,
              relationship_key=None,
              source_entity=None,
              validated_node_ids=None):

        if depth == 0:
            if entity is None:
                entity = self.entity
            if source_entity is None:
                source_entity = entity
            node_id = self.node_id_from(entity)
            node = {
                'datum': self.node_dict_from(entity),
                'depth': 0,
                'id': node_id,
                'type': self.node_type_from(entity)
            }
            edges = []
            nodes = [node]

            if parsed_node_ids is None:
                parsed_node_ids = [node_id]

            if validated_node_ids is None:
                validated_node_ids = [node_id]

            leaves = []

        source = self.node_id_from(source_entity)

        sub_depth = depth + 1
        for key in entity.__mapper__.relationships.keys():
            sub_entities = getattr(entity, key)
            if not isinstance(sub_entities, list):
                sub_entities = [sub_entities] if sub_entities is not None else []
            for sub_entity in sub_entities:
                sub_node_id = self.node_id_from(sub_entity)

                is_validated = self.is_valid_node(sub_entity,
                                                  depth=sub_depth,
                                                  key=key,
                                                  parent_entity=entity,
                                                  source_entity=source_entity)
                if limit and len(validated_node_ids) >= limit:
                    continue

                if is_validated:
                    if sub_node_id not in validated_node_ids:
                        node = {
                            'datum': self.node_dict_from(sub_entity),
                            'depth': sub_depth,
                            'id': sub_node_id,
                            'type': self.node_type_from(sub_entity)
                        }
                        validated_node_ids.append(sub_node_id)
                        nodes.append(node)

                    edge = {
                        'id': '{}_{}'.format(source, sub_node_id),
                        'source': source,
                        'target': sub_node_id
                    }
                    edges.append(edge)

                if sub_node_id in parsed_node_ids:
                    continue
                parsed_node_ids.append(sub_node_id)

                is_stopped = self.is_stop_node(sub_entity,
                                               depth=sub_depth,
                                               key=key,
                                               parent_entity=entity,
                                               source_entity=source_entity)
                if is_stopped:
                    continue

                self.parse(sub_entity,
                           depth=sub_depth,
                           edges=edges,
                           leaves=leaves,
                           limit=limit,
                           nodes=nodes,
                           parent_entity=sub_entity,
                           parsed_node_ids=parsed_node_ids,
                           relationship_key=key,
                           source_entity=sub_entity if is_validated else source_entity,
                           validated_node_ids=validated_node_ids)


        if depth == 0:
            self.edges = edges
            self.nodes = nodes

        return leaves
