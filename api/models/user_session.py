from sqlalchemy import BigInteger, Column
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy_api_handler import ApiHandler

from utils.db import db


class UserSession(ApiHandler,
                  db.Model):

    userId = Column(BigInteger(), nullable=False)

    uuid = Column(UUID(as_uuid=True), unique=True, nullable=False)
