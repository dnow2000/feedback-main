from sqlalchemy import Column, String, Text
from sqlalchemy_api_handler import ApiHandler

from models.mixins import HasScienceFeedbackMixin
from models.mixins import HasGraphMixin
from utils.db import db


class Claim(ApiHandler,
            db.Model,
            HasGraphMixin,
            HasScienceFeedbackMixin):

    poynterIdentifier = Column(String(8))

    text = Column(Text())
