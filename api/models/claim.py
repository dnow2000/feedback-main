from sqlalchemy import Column, Text
from sqlalchemy_api_handler import ApiHandler

from models.utils.db import Model


class Claim(ApiHandler, Model):
  text = Column(Text)
  