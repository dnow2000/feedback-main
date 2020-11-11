import enum
from sqlalchemy import Column, \
                       DateTime, \
                       Enum, \
                       String
from sqlalchemy.dialects.postgresql import JSON, UUID
from sqlalchemy_api_handler import ApiHandler

from utils.database import db


class TaskState(enum.Enum):
    CREATED = 'created'
    FAILURE = 'failure'
    PUBLISHED = 'published'
    RECEIVED = 'received'
    STARTED = 'started'
    STOPPED = 'stopped'
    SUCCESS = 'success'


class Task(ApiHandler,
           db.Model):

    args = Column(JSON())

    celeryUuid = Column(UUID(as_uuid=True),
                            index=True,
                            nullable=False)

    hostname = Column(String(64))

    kwargs = Column(JSON())

    name = Column(String(256),
                  nullable=False)

    queue = Column(String(64))

    result = Column(JSON())

    state = Column(Enum(TaskState),
                   nullable=False)

    startTime = Column(DateTime(),
                       nullable=False)

    stopTime = Column(DateTime())
