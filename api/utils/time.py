def str_from_timedelta(td):
    hours = int(td.seconds / 3600)
    hours = '0' + str(hours) if hours < 10 else str(hours)
    minutes = int((td.seconds % 3600) / 60)
    minutes = '0' + str(minutes) if minutes < 10 else str(minutes)
    seconds = td.seconds % 60
    seconds = '0' + str(seconds) if seconds < 10 else str(seconds)
    time_str = f'{hours}h{minutes}m{seconds}s'
    if td.days:
        time_str = f'{td.days}d-{time_str}'

    return time_str
