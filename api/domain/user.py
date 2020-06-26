import re

from sandboxes.scripts.utils.storage_utils import store_public_object_from_sandbox_assets
from utils.config import APP_NAME, \
                         COMMAND_NAME, \
                         TLD


def store_user_thumb_from_sandbox(user):
    regexp = r'{}test.(.[a-z]+)([0-9])@{}.{}'.format(COMMAND_NAME, APP_NAME, TLD)
    re_match = re.match(regexp, user.email)
    user_type = re_match.group(1)
    role_index = re_match.group(2)
    store_public_object_from_sandbox_assets('thumbs',
                                            user,
                                            '{}_{}'.format(user_type, role_index))
