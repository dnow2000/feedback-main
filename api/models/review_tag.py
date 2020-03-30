from sqlalchemy import BigInteger, Column, ForeignKey
from sqlalchemy.orm import backref, relationship
from sqlalchemy_api_handler import ApiHandler

from models.utils.db import Model


class ReviewTag(ApiHandler,
                Model):

    reviewId = Column(BigInteger,
                      ForeignKey('review.id'),
                      primary_key=True)

    review = relationship('Review',
                          foreign_keys=[reviewId],
                          backref=backref("reviewTags"))

    tagId = Column(BigInteger,
                   ForeignKey('tag.id'),
                   primary_key=True)

    tag = relationship('Tag',
                       foreign_keys=[tagId],
                       backref=backref("reviewTags"))
