from models.content import Content, ContentType
from models.link import LinkType, LinkSubType
from utils.database import db


links = []
for content in Content.query.filter(Content.type!=ContentType.POST).all():
    links += content.whereItIsLinkingLinks

for link in links:
    link.type = LinkType.APPEARANCE
    link.subType = LinkSubType.QUOTATION

db.session.add_all(links)
db.session.commit()
