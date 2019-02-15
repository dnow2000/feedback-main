from sqlalchemy import Column,\
                       String
from sqlalchemy.orm import relationship

from models.utils.db import Model
from models.manager import Manager
from models.mixins import HasThumbMixin


class Image(Manager,
            Model,
            HasThumbMixin):

    name = Column(String(140))
