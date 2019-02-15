""" has qualification mixin """
from sqlalchemy import Column, String, Text

class HasQualificationMixin(object):
    expertise = Column(Text, nullable=True)

    organization = Column(String(220))

    profession =  Column(String(220))

    url = Column(String(220))
