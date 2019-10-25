# -*- coding: utf-8 -*-
from pprint import pprint
import traceback
from flask import current_app as app

from models.utils.clean import clean_all_database

@app.manager.option('-t',
                    '--target',
                    help='Clean target',
                    default="database")
def clean(target):
    try:
        if target == "database":
            clean_all_database()
    except Exception as e:
        print('ERROR: ' + str(e))
        traceback.print_tb(e.__traceback__)
        pprint(vars(e))
