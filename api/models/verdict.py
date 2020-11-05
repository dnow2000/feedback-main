import enum
from sqlalchemy import BigInteger,\
                       Column,\
                       Enum,\
                       ForeignKey,\
                       String,\
                       Text
from sqlalchemy.event import listens_for
from sqlalchemy.orm import relationship
from sqlalchemy.orm.collections import InstrumentedList
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.mixins.soft_deletable_mixin import SoftDeletableMixin

from domain.keywords import create_ts_vector_and_table_args
from models.mixins import HasRatingMixin, \
                          HasScienceFeedbackMixin
import tasks.graph
from utils.database import db


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

    @property
    def type(self):
        if self.content:
            return self.content.type
        return 'claim'

ts_indexes = [
    ('idx_verdict_fts_comment', Verdict.comment),
    ('idx_verdict_fts_summary', Verdict.title),
]
(Verdict.__ts_vectors__, Verdict.__table_args__) = create_ts_vector_and_table_args(ts_indexes)


@listens_for(Verdict, 'after_insert')
def after_insert(mapper, connect, self):
    tasks.graph.sync_with_parsing.delay('verdictId',
                                        self.id,
                                        is_anonymised=False)
    tasks.graph.sync_with_parsing.delay('verdictId',
                                        self.id,
                                        is_anonymised=True)
