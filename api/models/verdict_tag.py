from sqlalchemy import BigInteger, Column, ForeignKey
from sqlalchemy.orm import backref, relationship

from models.utils.db import Model
from models.manager import Manager


class VerdictTag(Manager,
              Model):

    verdictId = Column(BigInteger,
                       ForeignKey('verdict.id'),
                       primary_key=True)

    verdict = relationship('Verdict',
                           foreign_keys=[verdictId],
                           backref=backref("verdictTags"))

    tagId = Column(BigInteger,
                   ForeignKey('tag.id'),
                   primary_key=True)

    tag = relationship('Tag',
                       foreign_keys=[tagId],
                       backref=backref("verdictTags"))
