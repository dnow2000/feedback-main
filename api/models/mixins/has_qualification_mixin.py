from sqlalchemy import Column, String, Text

class HasQualificationMixin(object):
    academicWebsite = Column(String(30))

    affiliation = Column(String(220))

    expertise = Column(Text, nullable=True)

    orcidId = Column(String(220))

    title = Column(String(220))
