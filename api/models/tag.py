import enum
from sqlalchemy import Column, \
                       Enum, \
                       Integer, \
                       String, \
                       Text
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.mixins.soft_deletable_mixin import \
    SoftDeletableMixin

from utils.db import db


class SourceName(enum.Enum):
    CLAIM = 'claim'
    CONTENT = 'content'


class TagType(enum.Enum):
    CONCLUSION = 'conclusion'
    DETAIL = 'detail'
    EVALUATION = 'evaluation'
    ISSUE = 'issue'
    QUALIFICATION = 'qualification'


class Tag(ApiHandler,
          db.Model,
          SoftDeletableMixin):

    info = Column(Text())

    label = Column(String(128))

    positivity = Column(Integer())

    source = Column(Enum(SourceName))

    type = Column(Enum(TagType))

    value = Column(Integer())
