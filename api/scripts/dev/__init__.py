# pylint: disable=W0122

import os
from pathlib import Path
from flask import current_app as app


DEV_PATH = Path(os.path.dirname(os.path.realpath(__file__)))


@app.manager.option('-f',
                    '--file',
                    help='Execute a script in api/scripts/dev',
                    default='')
def dev(file):
    exec(open(DEV_PATH / file).read())
