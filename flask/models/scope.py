import enum
from sqlalchemy import BigInteger,\
                       Column,\
                       ForeignKey,\
                       String
from sqlalchemy.orm import relationship

from models.utils.db import Model
from models.manager import Manager

class ScopeType(enum.Enum):
    article = "article"
    review = "review"
    user = "user"
    verdict = "verdict"

class Scope(Manager, Model):

    tagId = Column(BigInteger,
                    ForeignKey('tag.id'),
                    nullable=False,
                    index=True)

    tag = relationship('Tag',
                       foreign_keys=[tagId],
                       backref='scopes')

    type = Column(String(50),
                  nullable=True)
