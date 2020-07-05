# -*- coding: utf-8 -*-
from pprint import pprint
import traceback
from flask import current_app as app

from sandboxes.create_sandbox import create_sandbox
from sandboxes.help_end2end import print_all_end2end_helpers


@app.manager.option('-n',
                    '--name',
                    help='Sandbox name',
                    default='sf')
def sandbox(name):
    try:
        create_sandbox(name)
    except Exception as e:
        print('ERROR: ' + str(e))
        traceback.print_tb(e.__traceback__)
        pprint(vars(e))


@app.manager.command
def sandbox_to_end2end():
    try:
        print_all_end2end_helpers()
    except Exception as e:
        print('ERROR: ' + str(e))
        traceback.print_tb(e.__traceback__)
        pprint(vars(e))
