from sqlalchemy import Column, String


class HasScienceFeedbackMixin(object):
    scienceFeedbackId = Column(String(32))
