from sqlalchemy import Column, String, Text
from sqlalchemy_api_handler import ApiHandler

from models.mixins import HasScienceFeedbackMixin
from utils.db import Model


class Claim(ApiHandler,
            Model,
            HasScienceFeedbackMixin):

    poynterIdentifier = Column(String(8))

    text = Column(Text())
