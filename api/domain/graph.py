import inflect
from sqlalchemy_api_handler.serialization import as_dict
from sqlalchemy_api_handler.utils import humanize


inflect_engine = inflect.engine()


def node_type_from(entity):
    return entity.__class__.__name__


def node_id_from(entity):
    return '{}_{}'.format(node_type_from(entity), entity.id)


def print_with_indent(depth):
    def wrapped(*args, **kwargs):
        print("".join(["    "]*depth), *args, **kwargs)
    return wrapped


def default_is_stop_node(entity, config):
    model_name = node_type_from(entity)

    if model_name in ['Role', 'Verdict']:
        return True

    if config['key'] == 'testifier':
        return True

    return False


def default_is_valid_node(entity, config):
    model_name = node_type_from(entity)
    if model_name in ['Appearance', 'AuthorContent', 'Role', 'Verdict']:
        return False

    if config['key'] == 'testifier':
        return False

    return True


def graph_from_entity(entity,
                      depth=0,
                      graph=None,
                      is_valid_node=None,
                      is_stop_node=None,
                      limit=None,
                      parent_entity=None,
                      parsed_node_ids=None,
                      relationship_key=None,
                      source_entity=None,
                      validated_node_ids=None):
    if not graph:
        graph = {
            'collectionName': inflect_engine.plural_noun(entity.__class__.__name__.lower()),
            'entityId': humanize(entity.id),
            'nodes': [],
            'edges': []
        }

    if is_valid_node is None:
        is_valid_node = default_is_valid_node

    if is_stop_node is None:
        is_stop_node = default_is_stop_node

    if parsed_node_ids is None:
        parsed_node_ids = []

    if validated_node_ids is None:
        validated_node_ids = []

    is_validated = False
    if limit and len(validated_node_ids) >= limit:
        if not depth:
            return graph
        return graph, is_validated

    node_id = node_id_from(entity)
    if node_id not in parsed_node_ids:
        parsed_node_ids.append(node_id)
        config = {
            'depth': depth,
            'graph': graph,
            'key': relationship_key,
            'parent': parent_entity,
            'source': source_entity
        }

        is_validated = is_valid_node(entity, config)
        if is_validated:
            node = {
                'datum': as_dict(entity),
                'depth': depth,
                'id': node_id,
                'type': node_type_from(entity)
            }

            source_entity = entity
            validated_node_ids.append(node_id)
            graph['nodes'].append(node)

        is_stopped = is_stop_node(entity, config)
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
                                      is_valid_node=is_valid_node,
                                      is_stop_node=is_stop_node,
                                      limit=limit,
                                      parent_entity=entity,
                                      parsed_node_ids=parsed_node_ids,
                                      relationship_key=key,
                                      source_entity=source_entity,
                                      validated_node_ids=validated_node_ids)
                if is_sub_node_validated:
                    sub_node_id = node_id_from(sub_entity)
                    source = node_id if is_validated else node_id_from(source_entity)
                    edge = {
                        'id': '{}_{}'.format(source, sub_node_id),
                        'source': source,
                        'target': sub_node_id
                    }
                    graph['edges'].append(edge)

    if not depth:
        return graph
    return graph, is_validated
