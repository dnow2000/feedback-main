from models.content import Content, ContentType


def statistic_from_model(model):
    query = model.query
    if model == Content:
        query = query.filter(model.type!=ContentType.POST)
    return {
        'count': query.count(),
        'modelName': model.__name__
    }
