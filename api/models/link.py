import enum
from sqlalchemy import BigInteger, \
                       Column, \
                       Enum, \
                       ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy_api_handler import ApiHandler

from models.mixins import HasCrowdtangleMixin, \
                          HasScienceFeedbackMixin
from utils.database import db


class LinkType(enum.Enum):
    APPEARANCE = 'appearance'
    BACKLINK = 'backlink'


class LinkSubType(enum.Enum):
    QUOTATION = 'quotation'
    SHARE = 'share'


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



class Link(ApiHandler,
           db.Model,
           HasCrowdtangleMixin,
           HasScienceFeedbackMixin):

    linkedClaimId = Column(BigInteger(),
                           ForeignKey('claim.id'),
                           index=True)

    linkedClaim = relationship('Claim',
                               foreign_keys=[linkedClaimId],
                               backref='whereItIsLinkedLinks')

    linkedContentId = Column(BigInteger(),
                             ForeignKey('content.id'),
                             index=True)

    linkedContent = relationship('Content',
                                 backref='whereItIsLinkedLinks',
                                 foreign_keys=[linkedContentId])

    linkingClaimId = Column(BigInteger(),
                            ForeignKey('claim.id'),
                            index=True)

    linkingClaim = relationship('Claim',
                                backref='whereItIsLinkingLinks',
                                foreign_keys=[linkingClaimId])

    linkingContentId = Column(BigInteger(),
                              ForeignKey('content.id'),
                              index=True)

    linkingContent = relationship('Content',
                                  foreign_keys=[linkingContentId],
                                  backref='whereItIsLinkingLinks')

    stance = Column(Enum(StanceType))

    subType = Column(Enum(LinkSubType))

    testifierId = Column(BigInteger(),
                         ForeignKey('user.id'),
                         nullable=False,
                         index=True)

    testifier = relationship('User',
                             foreign_keys=[testifierId],
                             backref='links')

    type = Column(Enum(LinkType), nullable=False)
