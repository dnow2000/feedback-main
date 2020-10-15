import enum
from sqlalchemy import Boolean, \
                       Column, \
                       Enum, \
                       String
from sqlalchemy.sql import expression
from sqlalchemy_api_handler import ApiHandler

from utils.database import db


class FeatureName(enum.Enum):
    WITH_VERDICT_CITATIONS = "L'application affiche la vue /verdicts/<verdict_id>/citations"
    WITH_VERDICT_GRAPH = "L'application affiche la vue /verdicts/<verdict_id>/graph"
    WITH_VERDICT_SHARES = "L'application affiche la vue /verdicts/<verdict_id>/shares"


class Feature(ApiHandler,
              db.Model):

    description = Column(String(300), nullable=False)

    isActive = Column(Boolean(),
                      default=True,
                      nullable=False,
                      server_default=expression.true())

    name = Column(Enum(FeatureName),
                  nullable=False,
                  unique=True)


    __as_dict_includes__ = [
        "nameKey"
    ]

    @property
    def nameKey(self):
        return str(self.name).replace('FeatureName.', '')
