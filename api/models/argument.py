from sqlalchemy import BigInteger,\
                       Column,\
                       Text
from sqlalchemy_api_handler import ApiHandler

from models.utils.db import Model


class Argument(ApiHandler,
               Model):

    comment = Column(Text(), nullable=True)
