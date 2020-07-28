from sqlalchemy import BigInteger,\
                       Column,\
                       ForeignKey,\
                       Text
from sqlalchemy.orm import relationship
from sqlalchemy.orm.collections import InstrumentedList
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.mixins.soft_deletable_mixin import SoftDeletableMixin

from utils.db import db
from models.mixins import HasScienceFeedbackMixin, \
                          HasRatingMixin


class Review(ApiHandler,
             db.Model,
             HasScienceFeedbackMixin,
             HasRatingMixin,
             SoftDeletableMixin):

    claimId = Column(BigInteger(),
                     ForeignKey('claim.id'),
                     index=True)

    claim = relationship('Claim',
                         foreign_keys=[claimId],
                         backref='reviews')

    comment = Column(Text())

    contentId = Column(BigInteger(),
                       ForeignKey('content.id'),
                       index=True)

    content = relationship('Content',
                           backref='reviews',
                           foreign_keys=[contentId])

    reviewerId = Column(BigInteger(),
                        ForeignKey('user.id'),
                        nullable=False,
                        index=True)

    reviewer = relationship('User',
                            foreign_keys=[reviewerId],
                            backref='reviews')

    @property
    def verdicts(self):
        Verdict = ApiHandler.model_from_table_name('verdict')
        VerdictReviewer = ApiHandler.model_from_table_name('verdict_reviewer')
        verdict_reviewers = VerdictReviewer.query.filter_by(reviewerId=self.reviewerId)
        verdict_ids = [verdict_reviewer.verdict.id for verdict_reviewer in verdict_reviewers]
        verdicts = Verdict.query.filter(Verdict.id.in_(verdict_ids)).all()
        return InstrumentedList(verdicts)
