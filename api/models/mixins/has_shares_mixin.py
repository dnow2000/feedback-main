from sqlalchemy import BigInteger, \
                       Column


class HasSharesMixin(object):

    facebookShares = Column(BigInteger)

    redditShares = Column(BigInteger)

    totalInteractions = Column(BigInteger)

    totalShares = Column(BigInteger)

    twitterShares = Column(BigInteger)
