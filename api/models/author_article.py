from sqlalchemy import BigInteger, Column, ForeignKey
from sqlalchemy.orm import backref, relationship
from sqlalchemy_api_handler import ApiHandler

from models.utils.db import Model


class AuthorArticle(ApiHandler,
                    Model):

    authorUserId = Column(BigInteger(),
                          ForeignKey('user.id'),
                          primary_key=True)

    authorUser = relationship('User',
                              foreign_keys=[authorUserId],
                              backref=backref("authorArticles"))

    articleId = Column(BigInteger(),
                       ForeignKey('article.id'),
                       primary_key=True)

    article = relationship('Article',
                           foreign_keys=[articleId],
                           backref=backref("authorArticles"))


    __as_dict_includes__ = [
        'article'
    ]
