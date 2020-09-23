from datetime import datetime, time

DATE_ISO_FORMAT = "%Y-%m-%dT%H:%M:%S.%fZ"

TODAY = datetime.combine(datetime.utcnow(), time(hour=20))


def strptime(date, date_format=DATE_ISO_FORMAT):
    if not date:
        return None
    return datetime.strptime(date, date_format)


def strftime(date, date_format=DATE_ISO_FORMAT):
    if not date:
        return None
    return date.strftime(date_format)
