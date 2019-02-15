from models.utils.db import get_model_with_table_name
from utils.inflect import inflect_engine
from utils.human_ids import dehumanize

class Relationships():

    def is_relationship_item(self, key, value):
        return key.endswith('Id') \
           and hasattr(self.__class__, key[:-2]) \
           and isinstance(value, (int, str))

    def has_set_relationship_from_key_ids(self, key, ids):

        """
        if not isinstance(ids, list) or not key.endswith('Ids'):
            return False

        singular_key = key[:-3]
        plural_key = inflect_engine.plural(singular_key)

        if not hasattr(self, plural_key) or \
           not hasattr(self.__class__, plural_key):
            return False

        for relationship in self.__mapper__.relationships:
            if relationship.key != plural_key:
                continue

            model = get_model_with_table_name(relationship.table.name)

            if model is not None:
                dehumanize_ids = [dehumanize(obj_id) for obj_id in ids]

                relationship_objects = model.query\
                    .filter(model.id.in_(dehumanize_ids)).all()

                setattr(self, plural_key, relationship_objects)

                return True
        """
        return False
