from sqlalchemy_handler import Handler

from models.article import Article
from models.evaluation import Evaluation
from models.user import User
from tests.utils import create_verdict
from utils.logger import logger

def create_verdicts():
    logger.info('create_verdicts')

    verdicts_by_name = {}

    article = Article.query\
                     .filter_by(url="http://www.dailymail.co.uk/sciencetech/article-4192182/World-leaders-duped-manipulated-global-warming-data.html").one()
    evaluation = Evaluation.query.filter_by(type="article", value=1).one()
    user = User.query.filter_by(email="sftest.editor.0@sciencefeedback.co").one()
    verdicts_by_name["Great Barrier / editor 0"] = create_verdict(
        user,
        article,
        "C'est neutre en fin de compte",
        evaluation=evaluation,
        rating=1,
    )

    Handler.save(*verdicts_by_name.values())

    logger.info('created {} verdicts'.format(len(verdicts_by_name)))

    return verdicts_by_name
