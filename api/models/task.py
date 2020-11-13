from datetime import datetime
import enum
from sqlalchemy import Column, \
                       DateTime, \
                       Enum, \
                       String, \
                       Text
from sqlalchemy.dialects.postgresql import JSON, UUID
from sqlalchemy.sql import func
from sqlalchemy_api_handler import ApiHandler

from domain.keywords import create_ts_vector_and_table_args
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

    creationTime = Column(DateTime(),
                          nullable=False,
                          server_default=func.now())

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

    traceback = Column(Text())


ts_indexes = [
    ('idx_task_fts_args', Task.args),
    ('idx_task_fts_kwargs', Task.kwargs)
]
(Task.__ts_vectors__, Task.__table_args__) = create_ts_vector_and_table_args(ts_indexes)
