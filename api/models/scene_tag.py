from sqlalchemy import BigInteger, Column, ForeignKey
from sqlalchemy.orm import backref, relationship
from sqlalchemy_api_handler import ApiHandler

from models.utils.db import Model


class SceneTag(ApiHandler,
                 Model):

    sceneId = Column(BigInteger(),
                       ForeignKey('scene.id'),
                       primary_key=True)

    scene = relationship('Scene',
                         foreign_keys=[sceneId],
                         backref=backref("sceneTags"))

    tagId = Column(BigInteger(),
                   ForeignKey('tag.id'),
                   primary_key=True)

    tag = relationship('Tag',
                       foreign_keys=[tagId],
                       backref=backref("sceneTags"))
