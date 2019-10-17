from models.tag import Tag

def create_tag(text, info=None):
    tag = Tag()
    tag.info = info
    tag.text = text

    return tag
