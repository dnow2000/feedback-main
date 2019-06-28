import enum
from sqlalchemy import BigInteger,\
                       Column,\
                       ForeignKey,\
                       String
from sqlalchemy.orm import relationship

from models.utils.db import Model
from models.manager import Manager

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

class Role(Manager, Model):

    userId = Column(BigInteger,
                    ForeignKey('user.id'),
                    nullable=False,
                    index=True)

    user = relationship('User',
                        foreign_keys=[userId],
                        backref='roles')

    type = Column(String(50),
                  nullable=True)
