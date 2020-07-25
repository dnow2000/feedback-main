from sqlalchemy import BigInteger, Column, ForeignKey
from sqlalchemy.orm import backref, relationship
from sqlalchemy_api_handler import ApiHandler

from utils.db import db


class VerdictTag(ApiHandler,
                 db.Model):

    verdictId = Column(BigInteger(),
                       ForeignKey('verdict.id'),
                       primary_key=True)

    verdict = relationship('Verdict',
                           backref=backref('verdictTags'),
                           foreign_keys=[verdictId])

    tagId = Column(BigInteger(),
                   ForeignKey('tag.id'),
                   primary_key=True)

    tag = relationship('Tag',
                       backref=backref('verdictTags'),
                       foreign_keys=[tagId])
