import enum
from sqlalchemy import BigInteger, \
                       Column, \
                       Enum, \
                       ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy_api_handler import ApiHandler

from models.mixins import HasCrowdtangleMixin, \
                          HasScienceFeedbackMixin

from utils.db import db


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
                                 backref=db.backref('quotedFromAppearances', lazy='dynamic'),
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
