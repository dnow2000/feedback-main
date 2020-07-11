from sqlalchemy_api_handler import ApiHandler

from models.medium import Medium
from models.organization import Organization


def create_or_modify_sf_organization_and_media():

    organization = Organization.create_or_modify({
        'name': 'Science Feedback',
        '__SEARCH_BY__': 'name'
    })

    ApiHandler.save(organization)

    climate_medium = Medium.create_or_modify({
        'name': 'Climate Feedback',
        'organization': organization,
        'url': 'https://sciencefeedback.co/',

    })

    health_medium = Medium.create_or_modify({
        'name': 'Health Feedback',
        'organization': organization,
        'url': 'https://sciencefeedback.co/',
        '__SEARCH_BY__': 'name'
    })

    science_medium = Medium.create_or_modify({
        'name': 'Science Feedback',
        'organization': organization,
        'url': 'https://sciencefeedback.co/',
        '__SEARCH_BY__': 'name'
    })

    ApiHandler.save(climate_medium,
                    health_medium,
                    science_medium)
