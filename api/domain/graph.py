import inflect
from sqlalchemy_api_handler.serialization import as_dict
from sqlalchemy_api_handler.utils import humanize


inflect_engine = inflect.engine()


def print_with_indent(depth):
    def wrapped(*args, **kwargs):
        print("".join(["    "]*depth), *args, **kwargs)
    return wrapped


class Graph():
    def __init__(self, **kwargs):
        self.__dict__.update(kwargs)
        if not self.__dict__.get('edges'):
            self.edges = []
        if not self.__dict__.get('nodes'):
            self.nodes =[]

    @staticmethod
    def node_type_from(entity):
        return entity.__class__.__name__

    @staticmethod
    def node_id_from(entity):
        return '{}_{}'.format(Graph.node_type_from(entity), entity.id)

    @staticmethod
    def node_dict_from(entity):
        node_type = Graph.node_type_from(entity)

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


    @staticmethod
    def is_stop_node(entity, config):
        node_type = Graph.node_type_from(entity)

        if node_type in ['Plaform', 'Role', 'Verdict']:
            return True

        if config['key'] == 'testifier':
            return True

        return False

    @staticmethod
    def is_valid_node(entity, config):
        node_type = Graph.node_type_from(entity)
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




def graph_from_entity(entity,
                      depth=0,
                      graph=None,
                      is_anonymised=False,
                      limit=1000,
                      parent_entity=None,
                      parsed_node_ids=None,
                      relationship_key=None,
                      source_entity=None,
                      validated_node_ids=None):
    if not graph:
        graph = Graph(collectionName=inflect_engine.plural_noun(entity.__class__.__name__.lower()),
                      entityId=humanize(entity.id),
                      isAnonymised=is_anonymised)

    if parsed_node_ids is None:
        parsed_node_ids = []

    if validated_node_ids is None:
        validated_node_ids = []

    is_validated = False
    if limit and len(validated_node_ids) >= limit:
        if not depth:
            return graph
        return graph, is_validated

    node_id = graph.node_id_from(entity)
    if node_id not in parsed_node_ids:
        parsed_node_ids.append(node_id)
        config = {
            'depth': depth,
            'graph': graph,
            'key': relationship_key,
            'parent': parent_entity,
            'source': source_entity
        }

        is_validated = graph.is_valid_node(entity, config)
        if is_validated:
            node = {
                'datum': graph.node_dict_from(entity),
                'depth': depth,
                'id': node_id,
                'type': graph.node_type_from(entity)
            }

            source_entity = entity
            validated_node_ids.append(node_id)
            graph.nodes.append(node)

        is_stopped = graph.is_stop_node(entity, config)
        if is_stopped:
            return graph, is_validated

        for key in entity.__mapper__.relationships.keys():
            sub_entities = getattr(entity, key)
            if not isinstance(sub_entities, list):
                sub_entities = [sub_entities] if sub_entities is not None else []
            for sub_entity in sub_entities:
                (
                    unused_graph,
                    is_sub_node_validated
                ) = graph_from_entity(sub_entity,
                                      depth=depth + 1,
                                      graph=graph,
                                      limit=limit,
                                      parent_entity=entity,
                                      parsed_node_ids=parsed_node_ids,
                                      relationship_key=key,
                                      source_entity=source_entity,
                                      validated_node_ids=validated_node_ids)
                if is_sub_node_validated:
                    sub_node_id = graph.node_id_from(sub_entity)
                    source = node_id if is_validated else graph.node_id_from(source_entity)
                    edge = {
                        'id': '{}_{}'.format(source, sub_node_id),
                        'source': source,
                        'target': sub_node_id
                    }
                    graph.edges.append(edge)

    if not depth:
        return graph
    return graph, is_validated
