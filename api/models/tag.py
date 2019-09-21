from sqlalchemy import Column,\
                       Text
from sqlalchemy_api_handler import ApiHandler

from models.utils.db import Model

class Tag(ApiHandler, Model):
    text = Column(Text, unique=True)

    info = Column(Text, nullable=True)
