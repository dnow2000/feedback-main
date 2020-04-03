import enum
from sqlalchemy import BigInteger,\
                       Column,\
                       Enum, \
                       ForeignKey,\
                       String
from sqlalchemy.orm import relationship
from sqlalchemy_api_handler import ApiHandler

from models.utils.db import Model


class RoleType(enum.Enum):
    def as_dict(self):
        dict_value = {
            'value': str(self.value),
        }
        return dict_value

    ADMIN = "admin"
    EDITOR = "editor"
    GUEST = "guest"
    REVIEWER = "reviewer"
    TESTIFIER = "testifier"


class Role(ApiHandler, Model):

    userId = Column(BigInteger,
                    ForeignKey('user.id'),
                    nullable=False,
                    index=True)

    user = relationship('User',
                        foreign_keys=[userId],
                        backref='roles')

    type = Column(Enum(RoleType),
                  nullable=True)
