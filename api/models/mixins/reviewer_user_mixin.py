from sqlalchemy import Column, String

class ReviewerUserMixin(object):

    academicWebsite = Column(String(30))

    affiliation = Column(String(30))

    title = Column(String(30))
