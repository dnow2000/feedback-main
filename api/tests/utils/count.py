from inspect import isclass
from sqlalchemy_api_handler import ApiHandler, logger

from models.utils.install import import_models

def get_saved_counts_by_model_name():
    saved_counts_by_model_name = {}
    models = import_models()
    for model in models:
        model_name = model.__name__
        if isclass(model)\
           and issubclass(model, ApiHandler)\
           and model_name != "ApiHandler":
            saved_counts_by_model_name[model_name] = model.query.count()
    print('saved_counts_by_model_name', saved_counts_by_model_name)
    return saved_counts_by_model_name


def assert_created_counts(saved_counts_by_model_name, **counts_by_model_name):
    models = import_models()
    for model in models:
        model_name = model.__name__
        if model_name not in counts_by_model_name:
            logger.info('{} is not in counts_by_model_name, ... is it normal ?'.format(model_name))
            continue
        assert model.query.count() - saved_counts_by_model_name[model_name]\
            == counts_by_model_name[model_name]
