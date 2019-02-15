from models.tag import Tag

def create_tag(text):
    tag = Tag()
    tag.text = text

    return tag
