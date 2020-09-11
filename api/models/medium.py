from sqlalchemy import BigInteger, \
                       Column, \
                       ForeignKey, \
                       String
from sqlalchemy.orm import relationship
from sqlalchemy_api_handler import ApiHandler

from models.mixins import HasCrowdtangleMixin, \
                          HasFacebookMixin, \
                          HasScienceFeedbackMixin
from utils.db import db


class Medium(ApiHandler,
             db.Model,
             HasCrowdtangleMixin,
             HasFacebookMixin,
             HasScienceFeedbackMixin):

    logoUrl = Column(String(512))

    name = Column(String(256), nullable=False)

    organizationId = Column(BigInteger(),
                            ForeignKey('organization.id'),
                            index=True)

    organization = relationship('Organization',
                                foreign_keys=[organizationId],
                                backref='media')

    platformId = Column(BigInteger(),
                        ForeignKey('platform.id'),
                        index=True)

    platform = relationship('Platform',
                            foreign_keys=[platformId],
                            backref='media')

    url = Column(String(300))
