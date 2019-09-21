from sqlalchemy import Boolean,\
                       Column,\
                       Integer

class HasRatingMixin(object):
    rating = Column(Integer, nullable=False, default=100)

    isApplicable = Column(Boolean,
                          nullable=False,
                          default=True)
