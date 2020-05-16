from sqlalchemy import BigInteger, Column, ForeignKey
from sqlalchemy.orm import backref, relationship
from sqlalchemy_api_handler import ApiHandler

from utils.db import Model


class AuthorContent(ApiHandler,
                Model):

    authorUserId = Column(BigInteger(),
                          ForeignKey('user.id'),
                          primary_key=True)

    authorUser = relationship('User',
                              foreign_keys=[authorUserId],
                              backref=backref('authorContents'))

    contentId = Column(BigInteger(),
                     ForeignKey('content.id'),
                     primary_key=True)

    content = relationship('Content',
                         foreign_keys=[contentId],
                         backref=backref('authorContents'))
