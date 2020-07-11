from sqlalchemy_api_handler import ApiHandler

from models.medium import Medium
from models.organization import Organization


def create_or_modify_sf_organization_and_media():

    organization = Organization.create_or_modify({
        '__SEARCH_BY__': 'name',
        'name': 'Science Feedback',
    })

    ApiHandler.save(organization)

    climate_medium = Medium.create_or_modify({
        '__SEARCH_BY__': 'name',
        'logoUrl': 'https://climatefeedback.org/wp-content/themes/wordpress-theme/dist/images/Climate_Feedback_logo_s.png',
        'name': 'Climate Feedback',
        'organization': organization,
        'url': 'https://climatefeedback.org',
    })

    health_medium = Medium.create_or_modify({
        '__SEARCH_BY__': 'name',
        'logoUrl': 'https://healthfeedback.org/wp-content/themes/wordpress-theme/dist/images/healthfeedback_logo.png',
        'name': 'Health Feedback',
        'organization': organization,
        'url': 'https://healthfeedback.org',
    })

    science_medium = Medium.create_or_modify({
        '__SEARCH_BY__': 'name',
        'logoUrl': 'https://sciencefeedback.co/wp-content/themes/SF-wordpress/dist/images/sciencefeedback_logo.png',
        'name': 'Science Feedback',
        'organization': organization,
        'url': 'https://sciencefeedback.co',
    })

    ApiHandler.save(climate_medium,
                    health_medium,
                    science_medium)
