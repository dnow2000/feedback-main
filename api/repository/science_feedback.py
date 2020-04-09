from domain.science_feedback import article_dict_from
from models.article import Article
from utils.airtable import rows_from
from utils.inflect import inflect_engine


def article_from(article_dict):
    article = Article.query.filter_by(title=article_dict['title']).one()
    if not article:
        article = Article(**article_dict)
    else:
        article.populate_from_dict(article_content)

    return article


def sync_articles():
    rows = rows_from('articles')

    entities = []
    for row in rows:
        entities.append(article_from(article_dict_from(row)))

    ApiHandler.save(*entities)


"""FOR LATER
def find_or_create(model, entity_dict, filter):
    entity = model.query.filter_by(**filter).one()
    if not entity:
        entity = model(**entity_dict)
    else:
        entity.populate_from_dict(entity_dict)

    return entity


def sync(collection_name):
    model_name = inflect_engine.singular_noun(collection_name)

    rows = rows_from(collection_name)

    entities = []
    for row in rows:
        entity_dict = locals()['{}_from'.format(model_name)](row)
        filter = locals()['{}_from'.format(model_name)]
        entity = find_or_create(model_name, entity_dict, filter)
        entities.append()

    ApiHandler.save(*entities)
"""
