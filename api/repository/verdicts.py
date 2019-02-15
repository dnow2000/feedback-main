from utils.human_ids import dehumanize

def filter_verdicts_with_article_id(query, article_id):
    query = query.filter_by(articleId=dehumanize(article_id))
    return query
