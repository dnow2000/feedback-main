from sqlalchemy import BigInteger, Column, ForeignKey
from sqlalchemy.orm import backref, relationship
from sqlalchemy_handler import Handler

from models.utils.db import Model

class ArticleTag(Handler,
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
