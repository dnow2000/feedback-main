from sqlalchemy import Column, String


class HasScienceFeedbackMixin(object):
    scienceFeedbackIdentifier = Column(String(32))

    scienceFeedbackUrl = Column(String(512))
