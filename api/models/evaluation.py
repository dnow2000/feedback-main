import enum
from sqlalchemy import Column,\
                       Integer,\
                       String,\
                       Text
from sqlalchemy_api_handler import ApiHandler

from utils.db import Model


class EvaluationType(enum.Enum):
    claim = "claim"
    content = "content"


class Evaluation(ApiHandler,
                 Model):

    info = Column(Text())

    label = Column(String(50))

    type = Column(String(50))

    value = Column(Integer())
