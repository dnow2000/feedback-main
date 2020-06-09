import enum
from sqlalchemy import BigInteger, \
                       Column, \
                       Enum, \
                       ForeignKey, \
                       String
from sqlalchemy.orm import relationship
from sqlalchemy_api_handler import ApiHandler

from utils.db import Model


class ScopeType(enum.Enum):
    claim = 'claim'
    content = 'content'
    review = 'review'
    user = 'user'
    verdict = 'verdict'


class Scope(ApiHandler,
            Model):

    tagId = Column(BigInteger(),
                   ForeignKey('tag.id'),
                   nullable=False,
                   index=True)

    tag = relationship('Tag',
                       foreign_keys=[tagId],
                       backref='scopes')

    type = Column(Enum(ScopeType))
