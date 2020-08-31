from sqlalchemy import Column, \
                       String
from sqlalchemy_api_handler import ApiHandler

from utils.db import db


class Platform(ApiHandler,
               db.Model):

    name = Column(String(128), nullable=False)
