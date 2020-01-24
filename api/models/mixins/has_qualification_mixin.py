from sqlalchemy import Column, String, Text

class HasQualificationMixin(object):
    academicWebsite = Column(String(220))

    affiliation = Column(String(220))

    expertise = Column(Text)

    orcidId = Column(String(220))

    title = Column(String(220))
