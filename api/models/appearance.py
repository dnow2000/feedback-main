import enum
from sqlalchemy import BigInteger, \
                       Column, \
                       Enum, \
                       ForeignKey
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.orm import relationship
from sqlalchemy_api_handler import ApiHandler

from models.utils.db import Model


class SentimentType(enum.Enum):
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


class Appearance(ApiHandler, Model):
    claimId = Column(BigInteger,
                    ForeignKey('claim.id'),
                    nullable=False,
                    index=True)

    claim = relationship('Claim',
                        foreign_keys=[claimId],
                        backref='appearances')

    sentiment = Column(Enum(SentimentType))

    source = Column(JSON())

    userId = Column(BigInteger,
                    ForeignKey('user.id'),
                    nullable=False,
                    index=True)

    user = relationship('User',
                        foreign_keys=[userId],
                        backref='appearances')
