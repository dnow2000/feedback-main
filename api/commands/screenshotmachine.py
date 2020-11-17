# -*- coding: utf-8 -*-
from pprint import pprint
import traceback
from flask import current_app as app

from models.content import Content
from utils.ovh.thumb import save_thumb
from utils.screenshotmachine import capture


@app.manager.option('-u',
                    '--url',
                    help='Url')
@app.manager.option('-i',
                    '--id',
                    help='Article id')
def screenshotmachine(url, content_id):
    try:
        thumb = capture(url)
        content = Content.query.filter_by(id=content_id).one()
        save_thumb(content, thumb, 0)
    except Exception as e:
        print('ERROR: ' + str(e))
        traceback.print_tb(e.__traceback__)
        pprint(vars(e))
