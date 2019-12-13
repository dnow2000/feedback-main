import enum
from sqlalchemy import Column,\
                       Integer,\
                       String,\
                       Text
from sqlalchemy_api_handler import ApiHandler

from models.utils.db import Model


class EvaluationType(enum.Enum):
    article = "article"
    claim = "claim"


class Evaluation(ApiHandler,
                 Model):

    label = Column(String(50),
                   nullable=True)

    info = Column(Text, nullable=True)

    type = Column(String(50),
                  nullable=True)

    value = Column(Integer, nullable=True)
