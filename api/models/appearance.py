import enum
from sqlalchemy import BigInteger, \
                       Column, \
                       Enum, \
                       ForeignKey
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.orm import relationship
from sqlalchemy_api_handler import ApiHandler

from models.utils.db import Model


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
                 Model):

    sceneId = Column(BigInteger(),
                     ForeignKey('scene.id'),
                     nullable=False,
                     index=True)

    scene = relationship('Scene',
                         foreign_keys=[sceneId],
                         backref='appearances')


    claimId = Column(BigInteger(),
                     ForeignKey('claim.id'),
                     nullable=False,
                     index=True)

    claim = relationship('Claim',
                         foreign_keys=[claimId],
                         backref='appearances')

    stance = Column(Enum(StanceType))


    testifierUserId = Column(BigInteger(),
                             ForeignKey('user.id'),
                             nullable=False,
                             index=True)

    testifierUser = relationship('User',
                                 foreign_keys=[testifierUserId],
                                 backref='appearances')
