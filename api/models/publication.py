from sqlalchemy import Column, \
                       Text, \
                       String
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.mixins.soft_deletable_mixin import SoftDeletableMixin

from models.utils.db import Model
from models.mixins import HasExternalThumbUrlMixin, \
                          VersionedMixin


class Publication(ApiHandler,
                  Model,
                  HasExternalThumbUrlMixin,
                  SoftDeletableMixin,
                  VersionedMixin):
                  
    summary = Column(Text())

    tags = Column(Text())

    title = Column(String(140))

    url = Column(String(220), nullable=False, unique=True)
