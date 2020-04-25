from sqlalchemy_api_handler import ApiHandler, logger

from models.role import RoleType
from models.user import User
from sandboxes.scripts.utils.storage_utils import store_public_object_from_sandbox_assets
from sandboxes.scripts.utils.helpers import get_sandbox_role_email, pick_one
from utils.credentials import get_hashed_default_password
from utils.config import COMMAND_NAME

USERS_BY_TYPE_COUNT = 3




AFFILIATIONS = [
    "Princeton University",
    "UCLA/NASA JPL",
    "University of California",
    "University of Melbourne"
]

FIRST_NAMES = [
    "Albert",
    "Erviche",
    "Julie",
    "Karl",
    "Lili",
    "Max",
    "Olivier",
]

EXPERTISE = [
    "Agricultural impacts of climate change",
    "Climate sensitivity",
    "Clouds",
    "Ecosystem-climate feedbacks",
    "Land use change and forestry",
    "Physical Oceanography",
    "Remote sensing",
    "Satellite data",
    "Societal adaptation",
    "Temperature records"
]

LAST_NAMES = [
    "Crochu",
    "Johnson",
    "Marxou",
    "Potdevin",
    "Steven Steven",
    "Zebrafish"
]

TITLES = [
    "Postdoctoral research associate",
    "Research fellow",
    "Physical Oceanographer",
    "Research Assistant",
    "Researcher",
    "Scientist"
]

def create_users():
    logger.info('create_users')

    hashed_default_password = get_hashed_default_password()

    users_by_name = {}

    user_types = [role_type.value for role_type in RoleType] + ['master', 'user']

    count = 0
    for user_type in user_types:
        for role_index in range(USERS_BY_TYPE_COUNT):
            user_dict = {
                "email": get_sandbox_role_email(user_type, role_index),
                "firstName": pick_one(FIRST_NAMES, count),
                "lastName": pick_one(LAST_NAMES, count),
            }

            if user_type == 'reviewer':
                user_dict.update({
                    "academicWebsite": "https://fr.wikipedia.org/wiki/Christiane_Faure",
                    "affiliation": pick_one(AFFILIATIONS, count),
                    "expertise": "{}, {}".format(
                        pick_one(EXPERTISE, count),
                        pick_one(EXPERTISE, count + 1)
                    ),
                    "orcidId": "0000-0003-3164-2391",
                    "title": pick_one(TITLES, count)
                })

            if user_type == 'editor':
                user_dict.update({
                    "affiliation": "Climate Feedback",
                    "title": "Science Editor"
                })

            user = User(**user_dict)
            user.password = hashed_default_password
            users_by_name['{} {}'.format(user_type, role_index)] = user

            count += 1

    ApiHandler.save(*users_by_name.values())

    for user_type in user_types:
        for role_index in range(USERS_BY_TYPE_COUNT):
            store_public_object_from_sandbox_assets(
                "thumbs",
                users_by_name['{} {}'.format(user_type, role_index)],
                "{}_{}".format(user_type, role_index)
            )

    logger.info('created {} users'.format(len(users_by_name)))

    return users_by_name
