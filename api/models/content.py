import enum
from celery import chain, group
from sqlalchemy import BigInteger, \
                       Boolean, \
                       Column, \
                       DateTime, \
                       Enum, \
                       ForeignKey, \
                       Text, \
                       String
from sqlalchemy.event import listens_for
from sqlalchemy.orm import relationship
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.mixins import HasActivitiesMixin, \
                                          SoftDeletableMixin
from sqlalchemy_api_handler.serialization import as_dict
from sqlalchemy_api_handler.utils import humanize

from domain.keywords import create_ts_vector_and_table_args
from domain.tasks import planified_dates_for
from models.mixins import HasCrowdtangleMixin, \
                          HasExternalThumbUrlMixin, \
                          HasFacebookMixin, \
                          HasThumbMixin, \
                          HasScienceFeedbackMixin, \
                          HasSharesMixin
import tasks.buzzsumo
import tasks.crowdtangle
import tasks.newspaper
import tasks.screenshotmachine
import tasks.waybackmachine

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

    @property
    def hostname(self):
        if self.url:
            return self.url.split('/')[2]


Content.ContentType = ContentType


ts_indexes = [
    ('idx_content_fts_title', Content.title),
    ('idx_content_fts_summary', Content.summary),
]
(Content.__ts_vectors__, Content.__table_args__) = create_ts_vector_and_table_args(ts_indexes)


@listens_for(Content, 'after_insert')
def after_insert(mapper, connect, self):

    if self.url != 'https://www.breitbart.com/big-government/2017/03/20/delingpole-great-barrier-reef-still-not-dying-whatever-washington-post-says':
        return

    if self.type in [ContentType.ARTICLE, ContentType.VIDEO]:
        contentify = chain(*map(lambda task: task.si(content_id=self.id),
                              [
                                  #tasks.buzzsumo.sync_with_trending,
                                  #tasks.buzzsumo.planify_sync_with_trending,
                                  #tasks.newspaper.sync_with_article,
                                  #tasks.newspaper.planify_sync_with_article,
                                  tasks.screenshotmachine.sync_with_capture
                              ]))
        linkify = chain(*map(lambda task: task.si(content_id=self.id),
                             [
                                tasks.crowdtangle.sync_with_shares,
                                #tasks.crowdtangle.planify_sync_with_shares
                             ]))
        group(
            contentify,
            #linkify,
            #tasks.waybackmachine.sync_with_archive.si(self.id)
        ).delay()
