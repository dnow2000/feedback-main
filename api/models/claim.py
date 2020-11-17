from sqlalchemy import Column, String, Text
from sqlalchemy_api_handler import ApiHandler

from models.mixins import HasGraphMixin, \
                          HasScienceFeedbackMixin
from utils.database import db


class Claim(ApiHandler,
            db.Model,
            HasGraphMixin,
            HasScienceFeedbackMixin):

    poynterIdentifier = Column(String(8))

    text = Column(Text())
