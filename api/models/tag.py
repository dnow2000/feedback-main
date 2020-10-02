import enum
from sqlalchemy import Column, \
                       Enum, \
                       Integer, \
                       String, \
                       Text
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.mixins.soft_deletable_mixin import \
    SoftDeletableMixin

from domain.keywords import create_ts_vector_and_table_args
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


ts_indexes = [
    ('idx_tag_fts_label', Tag.label),
]
(Tag.__ts_vectors__, Tag.__table_args__) = create_ts_vector_and_table_args(ts_indexes)
