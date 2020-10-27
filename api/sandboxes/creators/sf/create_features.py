from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.utils import logger

from models.feature import Feature, FeatureName


def create_features():
    logger.info('   create_features...')

    features = []

    for feature in FeatureName:
        features.append(Feature(description=feature.value,
                                isActive=True,
                                name=feature))

    ApiHandler.save(*features)

    logger.info('   created {} features'.format(len(features)))

    return features
