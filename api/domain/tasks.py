from datetime import datetime, timedelta


def planified_dates_for(task_name):

    if task_name in ['buzzsumo.sync_with_trending', 'crowdtangle.sync_with_shares']:
        dates = [datetime.now() + timedelta(seconds=5)]
        '''
        dates = [datetime.now() + timedelta(minutes=15)]
        for index in range(0, 3):
            dates.append(dates[-1] + timedelta(minutes=15))
        for index in range(0, 24):
            dates.append(dates[-1] + timedelta(hours=1))
        for index in range(0, 3 * 4):
            dates.append(dates[-1] + timedelta(hours=6))
        for index in range(0, 7):
            dates.append(dates[-1] + timedelta(days=1))
        for index in range(0, 3):
            dates.append(dates[-1] + timedelta(days=10))
        for index in range(0, 6):
            dates.append(dates[-1] + timedelta(days=30))
        '''

    elif task_name == 'newspaper.sync_with_article':
        dates = [datetime.now() + timedelta(days=15)]
        for index in range(0, 2):
            dates.append(dates[-1] + timedelta(days=15))

    return dates
