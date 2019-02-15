from models.review_tag import ReviewTag

def create_review_tag(
        review=None,
        tag=None
):
    review_tag = ReviewTag()
    review_tag.review = review
    review_tag.tag = tag
    return review_tag
