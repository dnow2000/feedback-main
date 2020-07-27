from sqlalchemy import Column, String, Text
from sqlalchemy_api_handler import ApiHandler

from models.mixins import HasScienceFeedbackMixin, \
                          HasScienceFeedbackPublishedDate
from utils.db import db


class Claim(ApiHandler,
            db.Model,
            HasScienceFeedbackMixin,
            HasScienceFeedbackPublishedDate):

    poynterIdentifier = Column(String(8))

    text = Column(Text())
