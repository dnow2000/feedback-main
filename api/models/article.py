from flask_login import current_user
from sqlalchemy import BigInteger, \
                       Boolean, \
                       Column, \
                       DateTime, \
                       Text, \
                       String
from typing import Iterable
from sqlalchemy_api_handler import ApiHandler, as_dict, humanize
from sqlalchemy_api_handler.mixins.soft_deletable_mixin import SoftDeletableMixin

from models.utils.db import Model
from models.mixins import HasExternalThumbUrlMixin, \
                          HasThumbMixin, \
                          HasSharesMixin, \
                          VersionedMixin
from models.role import RoleType


class Article(ApiHandler,
              Model,
              HasExternalThumbUrlMixin,
              HasSharesMixin,
              HasThumbMixin,
              SoftDeletableMixin,
              VersionedMixin):
    authors = Column(Text)

    isReviewable = Column(Boolean)

    isValidatedAsPeerPublication = Column(Boolean, nullable=False, default=False)

    publishedDate = Column(DateTime)

    sourceId = Column(String(128), unique=True)

    summary = Column(Text)

    tags = Column(Text)

    theme = Column(String(140))

    title = Column(String(140))

    url = Column(String(220), nullable=False, unique=True)

    def get_score(self):
        amount = 0
        if self.tags and 'PeerVerified' in self.tags:
            amount -= 10
        return amount


@as_dict.register(Article)
def _(article, column=None, includes: Iterable = ()):
    article_dict = as_dict.registry[ApiHandler](article, includes=includes)

    # REMOVE OTHER REVIEWERS REVIEWS
    # TODO: This will never enable to see all reviews. Remove.
    if 'reviews' in article_dict and\
        current_user.is_authenticated and\
        RoleType.reviewer in map(lambda role: role.type, current_user.roles):
        humanized_user_id = humanize(current_user.id)
        reviews = article_dict['reviews']
        article_dict['reviews'] = [
            review for review in article_dict['reviews']
            if review['userId'] == humanized_user_id
        ]
        if len(article_dict['reviews']) == 1:
            article_dict['reviews'] = reviews

    return article_dict
