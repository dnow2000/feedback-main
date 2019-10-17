from inspect import isclass
from sqlalchemy_api_handler import ApiHandler

import models

def get_saved_counts_by_model_name(app):
    saved_counts_by_model_name = {}
    for model_name in dir(models):
        model = getattr(models, model_name)
        if isclass(model)\
           and issubclass(model, ApiHandler)\
           and model_name != "ApiHandler":
            saved_counts_by_model_name[model_name] = model.query.count()
    return saved_counts_by_model_name


def assert_created_counts(app, saved_counts_by_model_name, **counts_by_model_name):
    for model_name in counts_by_model_name.keys():
        model = getattr(models, model_name)
        print(model.query.count() - saved_counts_by_model_name[model_name], counts_by_model_name[model_name])
        assert model.query.count() - saved_counts_by_model_name[model_name]\
               == counts_by_model_name[model_name]
