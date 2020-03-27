from sqlalchemy import Column, String, Text
from sqlalchemy_api_handler import ApiHandler

from models.utils.db import Model


class Claim(ApiHandler, Model):
    sourceId = Column(String(128), unique=True)

    text = Column(Text)
