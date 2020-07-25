from sqlalchemy import Column,\
                       String
from sqlalchemy.orm import relationship
from sqlalchemy_api_handler import ApiHandler

from models.mixins import HasThumbMixin
from utils.db import db


class Image(ApiHandler,
            db.Model,
            HasThumbMixin):

    name = Column(String(140))
