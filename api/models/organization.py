from sqlalchemy import Column, String, Text
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy_api_handler import ApiHandler

from models.utils.db import Model


class Organization(ApiHandler, Model):

    entity = Column(String(16))
    label = Column(String(64))
    description = Column(String(128))
