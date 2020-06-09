import enum
from sqlalchemy import BigInteger, \
                       Boolean, \
                       Column, \
                       DateTime, \
                       Enum, \
                       Text, \
                       String
from sqlalchemy_api_handler import ApiHandler, as_dict, humanize
from sqlalchemy_api_handler.mixins.soft_deletable_mixin import SoftDeletableMixin

from models.mixins import HasExternalThumbUrlMixin, \
                          HasThumbMixin, \
                          HasScienceFeedbackMixin, \
                          HasSharesMixin, \
                          VersionedMixin
from utils.db import Model


class ContentType(enum.Enum):
    def as_dict(self):
        dict_value = {
            'value': str(self.value),
        }
        return dict_value

    article = 'article'
    post = 'post'
    video = 'video'


class Content(ApiHandler,
              Model,
              HasExternalThumbUrlMixin,
              HasScienceFeedbackMixin,
              HasSharesMixin,
              HasThumbMixin,
              SoftDeletableMixin,
              VersionedMixin):


    archiveUrl = Column(String(220), unique=True)

    authors = Column(Text())

    buzzsumoIdentifier = Column(String(16))

    isReviewable = Column(Boolean())

    isValidatedAsPeerPublication = Column(Boolean(),
                                          nullable=False,
                                          default=False)

    publishedDate = Column(DateTime())

    summary = Column(Text())

    tags = Column(Text())

    theme = Column(String(140))

    title = Column(String(140))

    type = Enum(ContentType)

    url = Column(String(512), nullable=False, unique=True)

    def get_score(self):
        amount = 0
        if self.tags and 'PeerVerified' in self.tags:
            amount -= 10
        return amount
