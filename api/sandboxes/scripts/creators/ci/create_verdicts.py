from sqlalchemy_api_handler import ApiHandler, logger

from models.article import Article
from models.evaluation import Evaluation
from models.user import User
from models.verdict import Verdict
from utils.config import APP_NAME, COMMAND_NAME,TLD


def create_verdicts():
    logger.info('create_verdicts')

    verdicts_by_name = {}
    articles = Article.query.all()
    user = User.query.filter_by(email="{}test.editor0@{}.{}".format(COMMAND_NAME, APP_NAME, TLD)).one()

    article = Article.query.filter_by(url="https://www.breitbart.com/big-government/2017/03/20/delingpole-great-barrier-reef-still-not-dying-whatever-washington-post-says").one()
    evaluation_value = -2
    evaluation = Evaluation.query.filter_by(type="article", value=evaluation_value).one()
    verdicts_by_name[article.id] = Verdict(
        article=article,
        comment='{"blocks":[{"key":"2l86g","text":"C\'est abusé, voici mon verdict lol","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        evaluation=evaluation,
        rating=evaluation_value,
        user=user
    )

    ApiHandler.save(*verdicts_by_name.values())

    logger.info('created {} verdicts'.format(len(verdicts_by_name)))

    return verdicts_by_name
