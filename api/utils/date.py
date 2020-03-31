from datetime import datetime, time

DATE_ISO_FORMAT = "%Y-%m-%dT%H:%M:%S.%fZ"

today = datetime.combine(datetime.utcnow(), time(hour=20))


def strptime(date):
    if '.' not in date:
        date = date + '.0'
    return datetime.strptime(date, DATE_ISO_FORMAT)

    
def strftime(date):
    return date.strftime(DATE_ISO_FORMAT)
