import enum
from flask_login import current_user
from sqlalchemy import BigInteger, \
                       Boolean, \
                       Column, \
                       DateTime, \
                       Enum, \
                       Text, \
                       String
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy_api_handler import ApiHandler, as_dict, humanize
from sqlalchemy_api_handler.mixins.soft_deletable_mixin import SoftDeletableMixin

from models.utils.db import Model
from models.mixins import HasExternalThumbUrlMixin, \
                          HasThumbMixin, \
                          HasScienceFeedbackMixin, \
                          HasSharesMixin, \
                          VersionedMixin


class SceneType(enum.Enum):
    def as_dict(self):
        dict_value = {
            'value': str(self.value),
        }
        return dict_value

    article = "article"
    post = "post"
    video = "video"


class Scene(ApiHandler,
            Model,
            HasExternalThumbUrlMixin,
            HasScienceFeedbackMixin,
            HasSharesMixin,
            HasThumbMixin,
            SoftDeletableMixin,
            VersionedMixin):


    archiveUrl = Column(String(220), nullable=False, unique=True)

    authors = Column(Text())

    isReviewable = Column(Boolean())

    isValidatedAsPeerPublication = Column(Boolean(),
                                          nullable=False,
                                          default=False)

    publishedDate = Column(DateTime())

    source = Column(JSON())

    summary = Column(Text())

    tags = Column(Text())

    theme = Column(String(140))

    title = Column(String(140))

    type = Enum(SceneType)

    url = Column(String(220), nullable=False, unique=True)

    def get_score(self):
        amount = 0
        if self.tags and 'PeerVerified' in self.tags:
            amount -= 10
        return amount
