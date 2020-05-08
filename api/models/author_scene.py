from sqlalchemy import BigInteger, Column, ForeignKey
from sqlalchemy.orm import backref, relationship
from sqlalchemy_api_handler import ApiHandler

from models.utils.db import Model


class AuthorScene(ApiHandler,
                Model):

    authorUserId = Column(BigInteger(),
                          ForeignKey('user.id'),
                          primary_key=True)

    authorUser = relationship('User',
                              foreign_keys=[authorUserId],
                              backref=backref('authorScenes'))

    sceneId = Column(BigInteger(),
                     ForeignKey('scene.id'),
                     primary_key=True)

    scene = relationship('Scene',
                         foreign_keys=[sceneId],
                         backref=backref('authorScenes'))
