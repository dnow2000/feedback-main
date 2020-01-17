from models.article import Article

def keep_not_saved_trendings(trendings):
    buzzsumo_ids = [trending['buzzsumoId'] for trending in trendings]

    saved_buzzsumo_articles = Article.query\
                                     .filter(
                                         Article.buzzsumoId.in_(buzzsumo_ids)
                                     ).all()

    saved_buzzsumo_ids = [
        saved_buzzsumo_article.buzzsumoId
        for saved_buzzsumo_article in saved_buzzsumo_articles
    ]

    return [
        trending for trending in trendings
        if trending['buzzsumoId'] not in saved_buzzsumo_ids
    ]
