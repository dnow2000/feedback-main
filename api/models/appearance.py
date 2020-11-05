import enum
from sqlalchemy import BigInteger, \
                       Boolean, \
                       Column, \
                       Enum, \
                       ForeignKey, \
                       String
from sqlalchemy.orm import relationship
from sqlalchemy_api_handler import ApiHandler

from models.mixins import HasCrowdtangleMixin, \
                          HasScienceFeedbackMixin

from utils.database import db


class AppearanceType(enum.Enum):
    LINK = 'link'
    SHARE = 'share'


class FlagType(enum.Enum):
    FALSE = 'False'
    FALSE_HEADLINE = 'False headline'
    MISLEADING = 'Misleading'
    MISSING_CONTEXT = 'Missing context'
    PARTLY_FALSE = 'Partly false'
    TRUE = 'True'


class StanceType(enum.Enum):
    ENDORSEMENT = {
        'label': 'endorsement',
        'value': 1
    }
    NEUTRAL = {
        'label': 'neutral',
        'value': 0
    }
    REFUSAL = {
        'label': 'refusal',
        'value': -1
    }


class Appearance(ApiHandler,
                 db.Model,
                 HasCrowdtangleMixin,
                 HasScienceFeedbackMixin):

    facebookFlag = Column(Enum(FlagType))

    facebookFlagComment = Column(String(2048))

    facebookSubmitted = Column(Boolean())

    quotedClaimId = Column(BigInteger(),
                           ForeignKey('claim.id'),
                           index=True)

    quotedClaim = relationship('Claim',
                               foreign_keys=[quotedClaimId],
                               backref='quotedFromAppearances')

    quotedContentId = Column(BigInteger(),
                             ForeignKey('content.id'),
                             index=True)

    quotedContent = relationship('Content',
                                 backref='quotedFromAppearances',
                                 foreign_keys=[quotedContentId])

    quotingClaimId = Column(BigInteger(),
                            ForeignKey('claim.id'),
                            index=True)

    quotingClaim = relationship('Claim',
                                backref='quotingToAppearances',
                                foreign_keys=[quotingClaimId])

    quotingContentId = Column(BigInteger(),
                              ForeignKey('content.id'),
                              index=True)

    quotingContent = relationship('Content',
                                  foreign_keys=[quotingContentId],
                                  backref='quotingToAppearances')

    stance = Column(Enum(StanceType))

    testifierId = Column(BigInteger(),
                         ForeignKey('user.id'),
                         nullable=False,
                         index=True)

    testifier = relationship('User',
                             foreign_keys=[testifierId],
                             backref='appearances')

    @property
    def subType(self):
        quoting_content_type = self.quotingContent.type.value
        if quoting_content_type in ['article', 'video']:
            return 'QUOTATION'
        if quoting_content_type == 'post':
            return 'SHARE'
