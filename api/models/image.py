from sqlalchemy import Column,\
                       String
from sqlalchemy.orm import relationship
from sqlalchemy_api_handler import ApiHandler

from models.mixins import HasThumbMixin
from models.utils.db import Model

class Image(ApiHandler,
            Model,
            HasThumbMixin):

    name = Column(String(140))
