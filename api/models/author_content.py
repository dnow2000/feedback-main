from sqlalchemy import BigInteger, Column, ForeignKey
from sqlalchemy.orm import backref, relationship
from sqlalchemy_api_handler import ApiHandler

from utils.database import db


class AuthorContent(ApiHandler,
                    db.Model):

    authorId = Column(BigInteger(),
                      ForeignKey('user.id'),
                      primary_key=True)

    author = relationship('User',
                          backref=backref('authorContents'),
                          foreign_keys=[authorId])

    contentId = Column(BigInteger(),
                       ForeignKey('content.id'),
                       primary_key=True)

    content = relationship('Content',
                           backref=backref('authorContents'),
                           foreign_keys=[contentId])
