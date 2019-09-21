from sqlalchemy import Column,\
                       String

class HasExternalThumbUrlMixin(object):
    externalThumbUrl = Column(String(220))
