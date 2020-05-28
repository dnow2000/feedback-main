from sqlalchemy import BigInteger,\
                       Column,\
                       ForeignKey,\
                       Text
from sqlalchemy.orm import relationship
from sqlalchemy.orm.collections import InstrumentedList
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.mixins.soft_deletable_mixin import SoftDeletableMixin
from sqlalchemy.orm.collections import InstrumentedList
from utils.db import get_model_with_table_name, Model
from models.mixins import HasRatingMixin


class Verdict(ApiHandler,
              Model,
              HasRatingMixin,
              SoftDeletableMixin):

    comment = Column(Text(), nullable=True)

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
                          backref='verdics')

    @property
    def reviews(self):
        Review = get_model_with_table_name('review')
        verdict_reviewer_ids = [
            verdictReviewer.reviewer.id
            for verdictReviewer in self.verdictReviewers
        ]
        reviews = Review.query.filter(
            (Review.contentId == self.contentId) &\
            (Review.reviewerId.in_(verdict_reviewer_ids))
        ).all()

        return InstrumentedList(reviews)
