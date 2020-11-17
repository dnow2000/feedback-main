import enum
from sqlalchemy import Column, \
                       Enum, \
                       String
from sqlalchemy_api_handler import ApiHandler

from models.mixins.has_science_feedback_mixin import HasScienceFeedbackMixin
from utils.database import db


class OrganizationType(enum.Enum):
    COMPANY = 'company'


class Organization(ApiHandler,
                   db.Model,
                   HasScienceFeedbackMixin):

    entity = Column(String(16))

    label = Column(String(64))

    description = Column(String(128))

    name = Column(String(256), nullable=False)

    type = Column(Enum(OrganizationType))
