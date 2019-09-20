from sqlalchemy import Column,\
                       Text
from sqlalchemy_handler import Handler

from models.utils.db import Model

class Tag(Handler, Model):
    text = Column(Text, unique=True)

    info = Column(Text, nullable=True)
