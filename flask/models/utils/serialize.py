from datetime import datetime
from psycopg2.extras import DateTimeRange
from sqlalchemy import Enum

def serialize(value, **options):
    if isinstance(value, Enum):
        return value.name
    elif isinstance(value, datetime):
        return value.isoformat()+"Z"
    elif isinstance(value, DateTimeRange):
        return {
            'start': value.lower,
            'end': value.upper
        }
    elif isinstance(value, list)\
            and len(value) > 0\
            and isinstance(value[0], DateTimeRange):
        return list(map(lambda d: {'start': d.lower,
                                   'end': d.upper},
                        value))
    else:
        return value
