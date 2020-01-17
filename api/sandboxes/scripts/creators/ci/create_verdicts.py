from sqlalchemy_api_handler import ApiHandler, logger

from models.article import Article
from models.evaluation import Evaluation
from models.user import User
from tests.utils.creators.create_verdict import create_verdict


def create_verdicts():
    logger.info('create_verdicts')

    verdicts_by_name = {}
    articles = Article.query.all()
    evaluation = Evaluation.query.filter_by(type="article", value=1).one()
    user = User.query.filter_by(email="sftest.editor.0@sciencefeedback.co").one()
    for i, article in enumerate(articles):
        verdicts_by_name[article.id] = create_verdict(
            user,
            article,
            comment='{"blocks":[{"key":"2l86g","text":"C\'est neutre en fin de compte, voici mon verdict lol","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
            evaluation=evaluation,
            rating=1,
        )

    ApiHandler.save(*verdicts_by_name.values())

    logger.info('created {} verdicts'.format(len(verdicts_by_name)))

    return verdicts_by_name
