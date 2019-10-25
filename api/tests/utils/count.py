from sqlalchemy_api_handler import ApiHandler, logger

from models.utils.install import import_models

def assert_created_counts(**counts_by_model_name):
    models = import_models()
    for model in models:
        model_name = model.__name__
        if model_name not in counts_by_model_name:
            logger.info('{} is not in counts_by_model_name, ... is it normal ?'.format(model_name))
            continue
        print(model_name, model.query.count(), counts_by_model_name[model_name])
        assert model.query.count() == counts_by_model_name[model_name]
