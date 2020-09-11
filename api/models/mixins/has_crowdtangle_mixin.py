from sqlalchemy import Column, \
                       String


class HasCrowdtangleMixin(object):

    crowdtangleIdentifier = Column(String(32))
