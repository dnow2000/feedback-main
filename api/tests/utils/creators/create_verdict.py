from models.verdict import Verdict

def create_verdict(user, article, comment, evaluation=None, rating=None):
    verdict = Verdict()
    verdict.article = article
    verdict.comment = comment
    verdict.evaluation = evaluation
    verdict.rating = rating
    verdict.user = user

    return verdict
