from sqlalchemy import Column, String, Text
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy_api_handler import ApiHandler

from models.mixins import HasScienceFeedbackMixin
from models.utils.db import Model


class Claim(ApiHandler,
            Model,
            HasScienceFeedbackMixin):

    source = Column(JSON())

    text = Column(Text())
