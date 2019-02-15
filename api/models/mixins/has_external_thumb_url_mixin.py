""" has external thumb url """
from sqlalchemy import Column,\
                       String

class HasExternalThumbUrlMixin(object):
    externalThumbUrl = Column(String(220))
