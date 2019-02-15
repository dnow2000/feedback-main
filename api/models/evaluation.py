import enum
from sqlalchemy import Column,\
                       Integer,\
                       String,\
                       Text

from models.utils.db import Model
from models.manager import Manager

class EvaluationType(enum.Enum):
    article = "article"
    claim = "claim"

class Evaluation(Manager, Model):

    label = Column(String(50),
                  nullable=True)

    info = Column(Text, nullable=True)

    type = Column(String(50),
                  nullable=True)

    value = Column(Integer, nullable=False)
