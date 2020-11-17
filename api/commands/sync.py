# -*- coding: utf-8 -*-
from datetime import datetime, timedelta
from pprint import pprint
import traceback
from flask import current_app as app

import repository.sync as syncs_by_name


@app.manager.option('-n',
                    '--name',
                    help='Name')
@app.manager.option('-f',
                    '--from',
                    dest='from_d',
                    help='From Date')
@app.manager.option('-t',
                    '--to',
                    dest='to_d',
                    help='To Date')
def sync(name, from_d, to_d):
    try:
        sync_function = getattr(syncs_by_name, name).sync
        if name == 'contents':
            now_date = datetime.utcnow()
            from_date = now_date - timedelta(minutes=int(from_d)) if from_d else None
            to_date = now_date - timedelta(minutes=int(to_d)) if to_d else None
            sync_function(from_date, to_date)
        else:
            sync_function()
    except Exception as e:
        print('ERROR: ' + str(e))
        traceback.print_tb(e.__traceback__)
        pprint(vars(e))
