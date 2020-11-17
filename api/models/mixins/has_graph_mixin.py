from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy import Column


class HasGraphMixin(object):
    anonymisedGraph = Column(JSON())

    graph = Column(JSON())
