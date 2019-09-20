import enum
from sqlalchemy import BigInteger,\
                       Column,\
                       ForeignKey,\
                       String
from sqlalchemy.orm import relationship
from sqlalchemy_handler import Handler

from models.utils.db import Model

class ScopeType(enum.Enum):
    article = "article"
    review = "review"
    user = "user"
    verdict = "verdict"

class Scope(Handler, Model):

    tagId = Column(BigInteger,
                    ForeignKey('tag.id'),
                    nullable=False,
                    index=True)

    tag = relationship('Tag',
                       foreign_keys=[tagId],
                       backref='scopes')

    type = Column(String(50),
                  nullable=True)
