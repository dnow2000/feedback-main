from sqlalchemy import Column,\
                       String
from sqlalchemy.orm import relationship
from sqlalchemy_handler import Handler

from models.mixins import HasThumbMixin
from models.utils.db import Model

class Image(Handler,
            Model,
            HasThumbMixin):

    name = Column(String(140))
