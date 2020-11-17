
# -*- coding: utf-8 -*-
from pprint import pprint
import traceback
from flask import current_app as app
from flask_script import Command

import utils.database
from utils.config import COMMAND_NAME


@app.manager.add_command
class DatabaseCommand(Command):
    __doc__ = ''' e.g. `{} database create` creates all the tables,
                       `{} database delete` deletes all the tables'''.format(COMMAND_NAME, COMMAND_NAME)
    name = 'database'
    capture_all_args = True

    def run(self, args):
        try:
            func = getattr(utils.database, args[0])()
        except Exception as e:
            print('ERROR: ' + str(e))
            traceback.print_tb(e.__traceback__)
            pprint(vars(e))
