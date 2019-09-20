from sqlalchemy import BigInteger, Column
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy_handler import Handler

from models.utils.db import Model

class UserSession(Handler, Model):
    userId = Column(BigInteger, nullable=False)

    uuid = Column(UUID(as_uuid=True), unique=True, nullable=False)
