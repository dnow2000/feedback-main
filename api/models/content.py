import enum
from sqlalchemy import BigInteger, \
                       Boolean, \
                       Column, \
                       DateTime, \
                       Enum, \
                       ForeignKey, \
                       Text, \
                       String
from sqlalchemy.orm import relationship
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.mixins import HasActivitiesMixin, \
                                          SoftDeletableMixin
from sqlalchemy_api_handler.serialization import as_dict
from sqlalchemy_api_handler.utils import humanize

from domain.keywords import create_ts_vector_and_table_args
from models.mixins import HasCrowdtangleMixin, \
                          HasExternalThumbUrlMixin, \
                          HasFacebookMixin, \
                          HasThumbMixin, \
                          HasScienceFeedbackMixin, \
                          HasSharesMixin
from utils.database import db


class ContentType(enum.Enum):
    ARTICLE = 'article'
    POST = 'post'
    VIDEO = 'video'


class Content(ApiHandler,
              db.Model,
              HasActivitiesMixin,
              HasCrowdtangleMixin,
              HasExternalThumbUrlMixin,
              HasFacebookMixin,
              HasScienceFeedbackMixin,
              HasSharesMixin,
              HasThumbMixin,
              SoftDeletableMixin):

    archiveUrl = Column(String(2048), unique=True)

    authors = Column(Text())

    buzzsumoIdentifier = Column(BigInteger())

    isReviewable = Column(Boolean())

    isValidatedAsPeerPublication = Column(Boolean(),
                                          nullable=False,
                                          default=False)

    mediumId = Column(BigInteger(),
                      ForeignKey('medium.id'),
                      index=True)

    medium = relationship('Medium',
                          foreign_keys=[mediumId],
                          backref='contents')

    publishedDate = Column(DateTime())

    summary = Column(Text())

    tags = Column(Text())

    theme = Column(String(140))

    title = Column(String(2048))

    type = Column(Enum(ContentType))

    url = Column(String(2048), unique=True)

    urlGone = Column(Boolean())

    urlNotFound = Column(Boolean())

    def get_score(self):
        amount = 0
        if self.tags and 'PeerVerified' in self.tags:
            amount -= 10
        return amount


ts_indexes = [
    ('idx_content_fts_title', Content.title),
    ('idx_content_fts_summary', Content.summary),
]
(Content.__ts_vectors__, Content.__table_args__) = create_ts_vector_and_table_args(ts_indexes)
