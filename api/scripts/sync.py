# -*- coding: utf-8 -*-
from datetime import datetime, timedelta
from pprint import pprint
import traceback
from flask import current_app as app

from models.article import Article
from repository.articles import sync_articles

@app.manager.option('-f',
                    '--from_date',
                    help='From Date')
@app.manager.option('-t',
                    '--to_date',
                    help='To Date')
def sync(from_date, to_date):
    try:
        now_date =  datetime.utcnow()
        from_date = now_date - timedelta(minutes=int(from_date))
        to_date = now_date - timedelta(minutes=int(to_date))
        sync_articles(from_date, to_date)
    except Exception as e:
        print('ERROR: ' + str(e))
        traceback.print_tb(e.__traceback__)
        pprint(vars(e))
