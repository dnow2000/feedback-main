# -*- coding: utf-8 -*-
from pprint import pprint
import traceback
from flask import current_app as app

from models.article import Article
from utils.screenshotmachine import capture
from storage.thumb import save_thumb


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
        save_thumb(article, thumb, 0)
    except Exception as e:
        print('ERROR: ' + str(e))
        traceback.print_tb(e.__traceback__)
        pprint(vars(e))
