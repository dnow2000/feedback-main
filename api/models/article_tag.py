from sqlalchemy import BigInteger, Column, ForeignKey
from sqlalchemy.orm import backref, relationship
from sqlalchemy_api_handler import ApiHandler

from models.utils.db import Model


class ArticleTag(ApiHandler,
                 Model):

    articleId = Column(BigInteger,
                       ForeignKey('article.id'),
                       primary_key=True)

    article = relationship('Article',
                           foreign_keys=[articleId],
                           backref=backref("articleTags"))

    tagId = Column(BigInteger,
                   ForeignKey('tag.id'),
                   primary_key=True)

    tag = relationship('Tag',
                       foreign_keys=[tagId],
                       backref=backref("articleTags"))
