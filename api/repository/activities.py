from models.activity import Activity
from utils.database import db


def filter_with_joined_activities(query):
    model = query._bind_mapper().class_
    is_on_table = Activity.table_name == model.__tablename__
    activity_data_id_matches_id = Activity.data['id']\
                                          .astext.cast(db.Integer) == model.id
    query = query.join(Activity, activity_data_id_matches_id)\
                 .filter(is_on_table)
    return query


def filter_by_activity_date_and_verb(query,
                                     from_date=None,
                                     to_date=None,
                                     verb=None):
    query = filter_with_joined_activities(query)

    if from_date:
        query = query.filter(Activity.issued_at >= from_date)
    if to_date:
        query = query.filter(Activity.issued_at <= to_date)

    if verb:
        is_verb = Activity.verb == verb
        query = query.filter(is_verb)

    return query
