from sqlalchemy import BigInteger, Column, ForeignKey
from sqlalchemy.orm import backref, relationship
from sqlalchemy_api_handler import ApiHandler

from models.utils.db import Model


class UserScene(ApiHandler,
                Model):

    userId = Column(BigInteger(),
                    ForeignKey('user.id'),
                    primary_key=True)

    user = relationship('User',
                        foreign_keys=[userId],
                        backref=backref("userScenes"))

    sceneId = Column(BigInteger(),
                     ForeignKey('scene.id'),
                     primary_key=True)

    scene = relationship('Scene',
                         foreign_keys=[sceneId],
                         backref=backref("userScenes"))
