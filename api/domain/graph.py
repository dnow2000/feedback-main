import inflect
from sqlalchemy_api_handler import as_dict, humanize


inflect_engine = inflect.engine()


def node_type_from(entity):
    return entity.__class__.__name__


def node_id_from(entity):
    return '{}_{}'.format(node_type_from(entity), entity.id)


def graph_from_entity(entity,
                      depth=0,
                      graph=None,
                      limit=None,
                      node_ids=None,
                      shortcutted_types=None,
                      source_entity=None):
    if shortcutted_types is None:
        shortcutted_types = []

    if not graph:
        graph = {
            'collectionName': inflect_engine.plural_noun(entity.__class__.__name__.lower()),
            'entityId': humanize(entity.id),
            'nodes': [],
            'edges': []
        }
        node_ids = []

    node_id = node_id_from(entity)
    has_added = False

    if limit and len(node_ids) >= limit:
        if not depth:
            return graph
        return graph, has_added

    if node_id not in node_ids:
        has_added = True

        node_type = node_type_from(entity)
        is_appended = node_type not in shortcutted_types
        if is_appended:
            node = {
                'datum': as_dict(entity),
                'id': node_id,
                'type': node_type
            }
            node_ids.append(node_id)
            graph['nodes'].append(node)

        for key in entity.__mapper__.relationships.keys():
            sub_entities = getattr(entity, key)
            if not isinstance(sub_entities, list):
                sub_entities = [sub_entities]
            for sub_entity in sub_entities:
                if sub_entity:
                    (
                        unused_graph,
                        has_added_sub_entity
                    ) = graph_from_entity(sub_entity,
                                          depth=depth + 1,
                                          graph=graph,
                                          limit=limit,
                                          node_ids=node_ids,
                                          shortcutted_types=shortcutted_types,
                                          source_entity=entity)
                    if has_added_sub_entity:
                        sub_node_id = node_id_from(sub_entity)
                        source = node_id if is_appended else node_id_from(source_entity)
                        edge = {
                            'id': '{}_{}'.format(source, sub_node_id),
                            'source': source,
                            'target': sub_node_id
                        }
                        graph['edges'].append(edge)

    if not depth:
        return graph
    return graph, has_added


def write_node_from_entity(entity):
    node = {
        'datum': as_dict(entity),
        'id': node_id_from(entity),
        'type': node_type_from(entity)
    }
    return node


def write_edge_between_nodes(source_node, target_node):
    edge = {
        'id': '{}_{}'.format(source_node['id'], target_node['id']),
        'source': source_node['id'],
        'target': target_node['id']
    }
    return edge


def graph_from_claim(claim):

    node_ids = []
    edge_ids = []
    graph = {
        'collectionName': inflect_engine.plural_noun(claim.__class__.__name__.lower()),
        'entityId': humanize(claim.id),
        'nodes': [],
        'edges': []
    }

    claim_node = write_node_from_entity(claim)
    graph['nodes'].append(claim_node)
    node_ids.append(claim_node['id'])

    print(claim_node['id'])

    for appearance in claim.quotedFromAppearances:

        content = appearance.quotingContent

        content_node = write_node_from_entity(content)
        if content_node['id'] not in node_ids:
            graph['nodes'].append(content_node)
            node_ids.append(content_node['id'])

        edge = write_edge_between_nodes(claim_node, content_node)
        if edge['id'] not in edge_ids:
            graph['edges'].append(edge)
            edge_ids.append(edge['id'])

        for appearance in content.quotedFromAppearances:

            medium = appearance.quotingContent.medium

            medium_node = write_node_from_entity(medium)
            if medium_node['id'] not in node_ids:
                graph['nodes'].append(medium_node)
                node_ids.append(medium_node['id'])

            edge = write_edge_between_nodes(content_node, medium_node)
            if edge['id'] not in edge_ids:
                graph['edges'].append(edge)
                edge_ids.append(edge['id'])          

    return graph