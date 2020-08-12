import enum
from sqlalchemy import BigInteger,\
                       Column,\
                       Enum,\
                       ForeignKey,\
                       String,\
                       Text
from sqlalchemy.orm import relationship
from sqlalchemy.orm.collections import InstrumentedList
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.mixins.soft_deletable_mixin import SoftDeletableMixin
from utils.db import db
from models.mixins import HasRatingMixin, \
                          HasScienceFeedbackMixin


class PostType(enum.Enum):
    ARTICLE = 'article'
    CLAIM = 'claim'
    INSIGHT = 'insight'
    VIDEO = 'video'


class Verdict(ApiHandler,
              db.Model,
              HasRatingMixin,
              SoftDeletableMixin,
              HasScienceFeedbackMixin):

    comment = Column(Text())

    claimId = Column(BigInteger(),
                     ForeignKey('claim.id'),
                     index=True)

    claim = relationship('Claim',
                         backref='verdicts',
                         foreign_keys=[claimId])

    contentId = Column(BigInteger(),
                       ForeignKey('content.id'),
                       index=True)

    content = relationship('Content',
                           foreign_keys=[contentId],
                           backref='verdicts')

    editorId = Column(BigInteger(),
                      ForeignKey('user.id'),
                      nullable=False,
                      index=True)

    editor = relationship('User',
                          foreign_keys=[editorId],
                          backref='verdicts')

    mediumId = Column(BigInteger(),
                      ForeignKey('medium.id'),
                      index=True)

    medium = relationship('Medium',
                          foreign_keys=[mediumId],
                          backref='verdicts')

    title = Column(String(2048))

    type = Enum(PostType)

    @property
    def reviews(self):
        Review = ApiHandler.model_from_table_name('review')
        verdict_reviewer_ids = [
            verdictReviewer.reviewer.id
            for verdictReviewer in self.verdictReviewers
        ]
        reviews = Review.query.filter(
            (Review.contentId == self.contentId) &\
            (Review.reviewerId.in_(verdict_reviewer_ids))
        ).all()

        return InstrumentedList(reviews)
