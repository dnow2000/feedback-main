from models.content import Content


def statistic_from_model(model):
    query = model.query
    if model == Content:
        query = query.filter(model.type == None)
    return {
        'count': query.count(),
        'modelName': model.__name__
    }
