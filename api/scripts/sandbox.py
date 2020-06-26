# -*- coding: utf-8 -*-
from pprint import pprint
import traceback
from flask import current_app as app

from sandboxes.scripts.create_sandbox import create_sandbox
from sandboxes.scripts.help_testcafe import print_all_testcafe_helpers


@app.manager.option('-n',
                    '--name',
                    help='Sandbox name',
                    default="ci")
def sandbox(name):
    try:
        create_sandbox(name)
    except Exception as e:
        print('ERROR: ' + str(e))
        traceback.print_tb(e.__traceback__)
        pprint(vars(e))


@app.manager.command
def sandbox_to_testcafe():
    try:
        print_all_testcafe_helpers()
    except Exception as e:
        print('ERROR: ' + str(e))
        traceback.print_tb(e.__traceback__)
        pprint(vars(e))
