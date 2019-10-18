from models.user import User

from utils.config import COMMAND_NAME, EMAIL_HOST

def create_user(
        affiliation=None,
        email="{}test.foo.1@{}".format(COMMAND_NAME, EMAIL_HOST),
        first_name="{} Test Foo 1".format(COMMAND_NAME.capitalize()),
        expertise=None,
        external_thumb_url=None,
        last_name="Foo 1",
        password="{}test.Foo.1".format(COMMAND_NAME),
        title=None,
):
    user = User()
    user.affiliation = affiliation
    user.email = email
    user.firstName = first_name
    if password:
        user.set_password(password)
    user.expertise = expertise
    user.external_thumb_url = external_thumb_url
    user.last_name = last_name
    user.title = title

    return user
