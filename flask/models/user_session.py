from sqlalchemy import BigInteger, Column
from sqlalchemy.dialects.postgresql import UUID

from models.manager import Manager
from models.utils.db import Model

class UserSession(Manager, Model):
    userId = Column(BigInteger, nullable=False)

    uuid = Column(UUID(as_uuid=True), unique=True, nullable=False)
