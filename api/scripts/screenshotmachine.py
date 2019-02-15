# -*- coding: utf-8 -*-
from pprint import pprint
import traceback
from flask import current_app as app

from models import Article
from utils.screenshotmachine import capture


@app.manager.option('-u',
                    '--url',
                    help='Url')
@app.manager.option('-i',
                    '--id',
                    help='Article id')
def screenshotmachine(url, id):
    try:
        thumb = capture(url)
        article = Article.query.filter_by(id=id).one()
        article.save_thumb(thumb, 0)
    except Exception as e:
        print('ERROR: ' + str(e))
        traceback.print_tb(e.__traceback__)
        pprint(vars(e))
