from sqlalchemy import Column, \
                       String


class HasFacebookMixin(object):

    facebookIdentifier = Column(String(32))
