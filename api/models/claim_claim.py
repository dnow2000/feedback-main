from sqlalchemy import BigInteger,\
                       Column,\
                       ForeignKey,\
                       Text
from sqlalchemy.orm import relationship
from sqlalchemy_api_handler import ApiHandler

from models.utils.db import Model


class ClaimClaim(ApiHandler,
                 Model):

    childClaimId = Column(BigInteger(),
                          ForeignKey('claim.id'),
                          index=True,
                          nullable=False)

    childClaim = relationship('Claim',
                              backref='parentClaims',
                              foreign_keys=[childClaimId])

    parentClaimId = Column(BigInteger(),
                           ForeignKey('claim.id'),
                           index=True,
                           nullable=False)

    parentClaim = relationship('Claim',
                               backref='childClaims',
                               foreign_keys=[parentClaimId])
