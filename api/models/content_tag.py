from sqlalchemy import BigInteger, Column, ForeignKey
from sqlalchemy.orm import backref, relationship
from sqlalchemy_api_handler import ApiHandler

from utils.db import db


class ContentTag(ApiHandler,
                 db.Model):

    contentId = Column(BigInteger(),
                       ForeignKey('content.id'),
                       primary_key=True)

    content = relationship('Content',
                         foreign_keys=[contentId],
                         backref=backref("contentTags"))

    tagId = Column(BigInteger(),
                   ForeignKey('tag.id'),
                   primary_key=True)

    tag = relationship('Tag',
                       foreign_keys=[tagId],
                       backref=backref("contentTags"))
