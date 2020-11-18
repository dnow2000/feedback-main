from sqlalchemy_api_handler import ApiHandler

from tasks import celery_app


@celery_app.task
def sync_with_parsing(entity_id=None, id_key=None, is_anonymised=False):
    Graph = ApiHandler.model_from_name('Graph')
    graph = Graph(isAnonymized=is_anonymised)
    setattr(graph, id_key, entity_id)
    graph.parse()
    ApiHandler.save(graph)
