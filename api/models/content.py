import enum
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
    if self.type in [ContentType.ARTICLE, ContentType.VIDEO]:
        #tasks.buzzsumo.sync_with_trending.delay(self.id).wait()
        if self.buzzsumoIdentifier:
            for eta in planified_dates_for('buzzsumo.sync_with_trending'):
                #tasks.buzzsumo.sync_with_trending.apply_async(self.id, eta=eta)
                pass
        elif self.type == ContentType.ARTICLE:
            tasks.newspaper.sync_with_article.delay(self.id)
            if not self.urlNotFound:
                for eta in planified_dates_for('newspaper.sync_with_article'):
                    #tasks.newspaper.sync_with_article.apply_async(self.id, eta=eta)
                    pass
            if not self.externalThumbUrl and self.thumbCount == 0:
                #tasks.screenshotmachine.sync_with_capture(self.id)
                pass

    if self.type == ContentType.POST:
        #tasks.crowdtangle.sync_with_shares.delay(self.id)
        for eta in planified_dates_for('crowdtangle.sync_with_shares'):
            #tasks.crowdtangle.sync_with_shares.apply_async(self.id, eta=eta)
            pass

    if not self.archiveUrl:
        #tasks.waybackmachine.sync_with_archive(self.id)
        pass
