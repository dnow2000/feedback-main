from models.tag import Tag


def create_tag(text, info=None, positivity=None):
    tag = Tag()
    tag.info = info
    tag.text = text
    tag.positivity = positivity

    return tag
