from random import random, seed


def node_type_from(entity):
    return entity.__class__.__name__


def node_id_from(entity):
    return '{}_{}'.format(node_type_from(entity), entity.id)


def label_from(entity):
    return node_id_from(entity)


def graph_from_entity(entity, node_ids=None, graph=None):
    if not graph:
        graph = {
            'nodes': [],
            'edges': []
        }
        node_ids = []
        seed(1)

    node_id = node_id_from(entity)

    if node_id not in node_ids:
        node = {
            'label': label_from(entity),
            'id': node_id_from(entity),
            'type': node_type_from(entity),
            'x': random(),
            'y': random(),
            'size': 3
        }
        node_ids.append(node_id)
        graph['nodes'].append(node)

        for key in entity.__mapper__.relationships.keys():
            sub_entities = getattr(entity, key)
            if not isinstance(sub_entities, list):
                sub_entities = [sub_entities]
            for sub_entity in sub_entities:
                if sub_entity:
                    sub_node_id = node_id_from(sub_entity)
                    edge = {
                        'id': '{}_{}'.format(node_id, sub_node_id),
                        'source': node_id,
                        'target': sub_node_id
                    }
                    graph['edges'].append(edge)
                    graph_from_entity(sub_entity,
                                      node_ids=node_ids,
                                      graph=graph)

    return graph
