from sqlalchemy import Column,\
                       Text

from models.utils.db import Model
from models.manager import Manager

class Tag(Manager, Model):
    text = Column(Text, unique=True)
