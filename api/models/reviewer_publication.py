from sqlalchemy import BigInteger, Column, ForeignKey
from sqlalchemy.orm import backref, relationship
from sqlalchemy_api_handler import ApiHandler

from models.utils.db import Model


class ReviewerPublication(ApiHandler,
                      Model):

    reviewerId = Column(BigInteger(),
                            ForeignKey('user.id'),
                            primary_key=True)

    reviewer = relationship('User',
                                foreign_keys=[reviewerId],
                                backref=backref('reviewerPublications'))

    publicationId = Column(BigInteger(),
                           ForeignKey('publication.id'),
                           primary_key=True)

    publication = relationship('Publication',
                               foreign_keys=[publicationId],
                               backref=backref('reviewerPublications'))
