from decimal import Decimal, \
                    InvalidOperation
from sqlalchemy import Float, \
                       Integer, \
                       Numeric
from models.manager.delete import Delete
from models.manager.soft_delete import SoftDelete
from models.manager.relationships import Relationships
from utils.human_ids import dehumanize

class Populate(
        Relationships,
        Delete,
        SoftDelete
):
    def __init__(self, **options):
        if options and 'from_dict' in options and options['from_dict']:
            self.populateFromDict(options['from_dict'])

    def populateFromDict(self, dct, skipped_keys=[]):
        self.check_not_soft_deleted()

        data = dct.copy()

        if data.__contains__('id'):
            del data['id']

        cols = self.__class__.__table__.columns._data

        for key in data.keys():

            data_value = data.get(key)

            if (key == 'deleted') or (key in skipped_keys):
                continue

            if self.has_set_relationship_from_key_ids(key, data_value):
                continue

            if cols.__contains__(key):
                col = cols[key]

                if self.is_relationship_item(key, data_value):
                    value = dehumanize(data_value)
                    setattr(self, key, value)
                    continue

                value = data_value

                if isinstance(value, str) and isinstance(col.type, Integer):
                    try:
                        setattr(self, key, Decimal(value))
                        continue
                    except InvalidOperation as io:
                        raise TypeError('Invalid value for %s: %r' % (key, value),
                                        'integer',
                                        key)

                elif isinstance(value, str) and isinstance(col.type, (Float, Numeric)):
                    try:
                        setattr(self, key, Decimal(value))
                        continue
                    except InvalidOperation as io:
                        raise TypeError('Invalid value for %s: %r' % (key, value),
                                        'decimal',
                                        key)

                setattr(self, key, value)
