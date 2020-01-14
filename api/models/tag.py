from sqlalchemy import Column, Integer, Text
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.mixins.soft_deletable_mixin import \
    SoftDeletableMixin

from models.utils.db import Model


class Tag(ApiHandler, Model, SoftDeletableMixin):
    info = Column(Text, nullable=True)
    positivity = Column(Integer, nullable=True)
    text = Column(Text, unique=True)
