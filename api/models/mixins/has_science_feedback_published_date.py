from sqlalchemy import Column, DateTime


class HasScienceFeedbackPublishedDate:
    scienceFeedbackPublishedDate = Column(DateTime())
