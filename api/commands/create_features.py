from flask import current_app as app
from sqlalchemy_api_handler import ApiHandler

from models.feature import Feature, FeatureName


@app.manager.command
def create_features():
    features = []
    for feature_name in FeatureName:
        features.append(Feature.create_or_modify({
            '__SEARCH_BY__': 'name',
            'description': feature_name.value,
            'isActive': False if feature_name.name == 'WITH_VERDICT_SHARES' else True,
            'name': feature_name
        }))
    ApiHandler.save(*features)
