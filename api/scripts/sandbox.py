""" sandbox script """
# -*- coding: utf-8 -*-
from pprint import pprint
import traceback
from flask import current_app as app

from sandboxes.scripts.create_sandbox import create_sandbox


@app.manager.option('-n',
                    '--name',
                    help='Sandbox name',
                    default="ci")
@app.manager.option('-c',
                    '--capture',
                    help='Capture screenshot',
                    default=False)
def sandbox(name, capture):
    try:
        create_sandbox(name, with_capture=capture)
    except Exception as e:
        print('ERROR: ' + str(e))
        traceback.print_tb(e.__traceback__)
        pprint(vars(e))
