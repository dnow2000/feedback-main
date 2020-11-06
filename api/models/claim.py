from sqlalchemy import Column, String, Text
from sqlalchemy_api_handler import ApiHandler

from models.mixins import HasScienceFeedbackMixin
from utils.database import db


class Claim(ApiHandler,
            db.Model,
            HasScienceFeedbackMixin):

    poynterIdentifier = Column(String(8))

    text = Column(Text())

    @property
    def linksCount(self):
        return len(self.quotedFromAppearances)

    @property
    def sharesCount(self):
        return sum([
            appearance.quotingContent.totalShares or 0
            for appearance in self.quotedFromAppearances
        ])
