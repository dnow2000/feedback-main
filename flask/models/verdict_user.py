from sqlalchemy import BigInteger, Column, ForeignKey
from sqlalchemy.orm import backref, relationship

from models.utils.db import Model
from models.manager import Manager

class VerdictUser(Manager,
                  Model):

    verdictId = Column(BigInteger,
                       ForeignKey('verdict.id'),
                       primary_key=True)

    verdict = relationship('Verdict',
                           foreign_keys=[verdictId],
                           backref=backref("verdictUsers"))

    userId = Column(BigInteger,
                    ForeignKey('user.id'),
                    primary_key=True)

    user = relationship('User',
                        foreign_keys=[userId],
                        backref=backref("verdictUsers"))
