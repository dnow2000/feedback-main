from sqlalchemy import BigInteger,\
                       Column,\
                       ForeignKey,\
                       Text
from sqlalchemy.orm import relationship
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.mixins.soft_deletable_mixin import SoftDeletableMixin

from models.utils.db import get_model_with_table_name, Model
from models.mixins import HasRatingMixin


class Verdict(ApiHandler,
              Model,
              HasRatingMixin,
              SoftDeletableMixin):

    articleId = Column(BigInteger,
                       ForeignKey('article.id'),
                       nullable=False,
                       index=True)

    article = relationship('Article',
                           foreign_keys=[articleId],
                           backref='verdicts')

    comment = Column(Text, nullable=True)

    userId = Column(BigInteger,
                    ForeignKey('user.id'),
                    nullable=False,
                    index=True)

    user = relationship('User',
                        foreign_keys=[userId],
                        backref='verdicts')

    @property
    def reviews(self):
        Review = get_model_with_table_name('review')
        verdict_user_ids = [
            verdictUser.user.id
            for verdictUser in self.verdictUsers
        ]
        reviews = Review.query.filter(
            (Review.articleId == self.articleId) &\
            (Review.userId.in_(verdict_user_ids))
        ).all()
        return reviews
