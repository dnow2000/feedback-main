import enum
from sqlalchemy import BigInteger,\
                       Column,\
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

    admin = "admin"
    editor = "editor"
    guest = "guest"
    reviewer = "reviewer"
    testifier = "testifier"


class Role(ApiHandler, Model):

    userId = Column(BigInteger,
                    ForeignKey('user.id'),
                    nullable=False,
                    index=True)

    user = relationship('User',
                        foreign_keys=[userId],
                        backref='roles')

    type = Column(String(50),
                  nullable=True)
