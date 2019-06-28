from models.user import User

from utils.config import COMMAND_NAME, EMAIL_HOST

def create_user(
        email="{}test.foo.1@{}".format(COMMAND_NAME, EMAIL_HOST),
        password="{}test.Foo.1".format(COMMAND_NAME),
        public_name="{} Test Foo 1".format(COMMAND_NAME.capitalize()),
        expertise=None,
        external_thumb_url=None,
        organization=None,
        profession=None,
):
    user = User()
    user.email = email
    if password:
        user.setPassword(password)
    user.publicName = public_name

    user.expertise = expertise
    user.external_thumb_url = external_thumb_url
    user.profession = profession
    user.organization = organization

    return user
