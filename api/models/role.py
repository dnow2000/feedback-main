import enum
from sqlalchemy import BigInteger,\
                       Column,\
                       Enum, \
                       ForeignKey,\
                       String
from sqlalchemy.orm import relationship
from sqlalchemy_api_handler import ApiHandler

from utils.database import db


class RoleType(enum.Enum):
    ADMIN = 'admin'
    AUTHOR = 'author'
    EDITOR = 'editor'
    GUEST = 'guest'
    INSPECTOR = 'inspector'
    REVIEWER = 'reviewer'
    TESTIFIER = 'testifier'


class Role(ApiHandler,
           db.Model):

    userId = Column(BigInteger(),
                    ForeignKey('user.id'),
                    nullable=False,
                    index=True)

    user = relationship('User',
                        foreign_keys=[userId],
                        backref='roles')

    type = Column(Enum(RoleType))
