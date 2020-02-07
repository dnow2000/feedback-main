from datetime import datetime, time

DATE_ISO_FORMAT = "%Y-%m-%dT%H:%M:%S.%fZ"

today = datetime.combine(datetime.utcnow(), time(hour=20))

def strftime(date):
    return date.strftime(DATE_ISO_FORMAT)
