from sqlalchemy import Column, DateTime, String
from sqlalchemy.ext.declarative import declared_attr


PUBLISHABLES = [
    'appearance',
    'content',
    'claim',
    'review',
    'verdict'
]


class HasScienceFeedbackMixin(object):
    scienceFeedbackIdentifier = Column(String(32))

    @declared_attr
    def scienceFeedbackUrl(cls):
        if cls.__tablename__ == 'verdict':
            return Column(String(512))

    @declared_attr
    def scienceFeedbackPublishedDate(cls):
        if cls.__tablename__ in PUBLISHABLES:
            return Column(DateTime())
