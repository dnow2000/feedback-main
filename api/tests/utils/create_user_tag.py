from models.user_tag import UserTag

def create_user_tag(
        user=None,
        tag=None
):
    user_tag = UserTag()
    user_tag.user = user
    user_tag.tag = tag
    return user_tag
