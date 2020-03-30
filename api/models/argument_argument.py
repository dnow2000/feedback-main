from sqlalchemy import BigInteger,\
                       Column,\
                       ForeignKey,\
                       Text
from sqlalchemy.orm import relationship
from sqlalchemy_api_handler import ApiHandler

from models.utils.db import Model


class ArgumentArgument(ApiHandler,
                       Model):

    childArgumentId = Column(BigInteger,
                             ForeignKey('argument.id'),
                             index=True,
                             nullable=False)

    childArgument = relationship('Argument',
                                 backref='parentArguments',
                                 foreign_keys=[childArgumentId])

    parentArgumentId = Column(BigInteger,
                              ForeignKey('argument.id'),
                              index=True,
                              nullable=False)

    parentArgument = relationship('Argument',
                                  backref='childArguments',
                                  foreign_keys=[parentArgumentId])
