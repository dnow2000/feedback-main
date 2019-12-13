from sqlalchemy import Column, Float


class HasRatingMixin(object):
    rating = Column(Float, nullable=True)
