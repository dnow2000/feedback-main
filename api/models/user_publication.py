from sqlalchemy import BigInteger, Column, ForeignKey
from sqlalchemy.orm import backref, relationship
from sqlalchemy_api_handler import ApiHandler

from models.utils.db import Model

class UserPublication(ApiHandler, Model):

    userId = Column(BigInteger,
                    ForeignKey('user.id'),
                    primary_key=True)

    user = relationship('User',
                        foreign_keys=[userId],
                        backref=backref("userPublications"))

    publicationId = Column(BigInteger,
                           ForeignKey('publication.id'),
                           primary_key=True)

    publication = relationship('Publication',
                               foreign_keys=[publicationId],
                               backref=backref("userPublications"))
