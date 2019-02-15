from models.review import Review

def create_review(user, article, comment, evaluation=None, rating=None):
    review = Review()
    review.article = article
    review.comment = comment
    review.evaluation = evaluation
    review.rating = rating
    review.user = user

    return review
