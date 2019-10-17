from sqlalchemy import Column,\
                       Text
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.mixins.soft_deletable_mixin import SoftDeletableMixin

from models.utils.db import Model

class Tag(ApiHandler, Model, SoftDeletableMixin):
    text = Column(Text, unique=True)

    info = Column(Text, nullable=True)
