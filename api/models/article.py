from flask_login import current_user
from sqlalchemy import BigInteger, \
                       Boolean, \
                       Column, \
                       Text, \
                       String
from sqlalchemy_api_handler import ApiHandler, humanize
from sqlalchemy_api_handler.mixins.soft_deletable_mixin import SoftDeletableMixin

from models.utils.db import Model
from models.mixins import HasExternalThumbUrlMixin, \
                          HasThumbMixin, \
                          HasSharesMixin, \
                          VersionedMixin
from models.role import RoleType

class Article(ApiHandler,
              Model,
              VersionedMixin,
              HasExternalThumbUrlMixin,
              HasSharesMixin,
              HasThumbMixin,
              SoftDeletableMixin):
    authors = Column(Text)

    buzzsumoId = Column(BigInteger, unique=True)

    isReviewable = Column(Boolean)

    isValidatedAsPeerPublication = Column(Boolean, nullable=False, default=False)

    summary = Column(Text)

    tags = Column(Text)

    title = Column(String(140))

    url = Column(String(220), nullable=False, unique=True)

    def as_dict(self, **options):
        article = Handler.as_dict(self, **options)

        # REMOVE OTHER REVIEWERS REVIEWS
        # TODO: This will never enable to see all reviews. Remove.
        if 'reviews' in article and\
            current_user.is_authenticated and\
            RoleType.reviewer in map(lambda role: role.type, current_user.roles):
            humanized_user_id = humanize(current_user.id)
            reviews = article['reviews']
            article['reviews'] = [
                review for review in article['reviews']
                if review['userId'] == humanized_user_id
            ]
            if len(article['reviews']) == 1:
                article['reviews'] = reviews

        return article

    def getScore(self):
        amount = 0
        if self.tags and 'PeerVerified' in self.tags:
            amount -= 10
        return amount
