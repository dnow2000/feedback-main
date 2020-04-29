# -*- coding: utf-8 -*-
from datetime import datetime, timedelta
from pprint import pprint
import traceback
from flask import current_app as app

import repository


@app.manager.option('-n',
                    '--name',
                    help='Name')
@app.manager.option('-f',
                    '--from_date',
                    help='From Date')
@app.manager.option('-t',
                    '--to_date',
                    help='To Date')
def sync(name, from_date, to_date):
    try:
        sync_function = getattr(repository, name).sync
        if name == 'article':
            now_date =  datetime.utcnow()
            from_date = now_date - timedelta(minutes=int(from_date))
            to_date = now_date - timedelta(minutes=int(to_date))
            sync_function(from_date, to_date)
        else:
            sync_function()
    except Exception as e:
        print('ERROR: ' + str(e))
        traceback.print_tb(e.__traceback__)
        pprint(vars(e))
