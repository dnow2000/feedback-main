from pprint import pprint
import traceback
from flask import current_app as app

from repository.clean import clean as clean_database
from models.content import Content
from models.appearance import Appearance


@app.manager.command
def dev():
    #### PUT HERE YOUR CODE TO BE DEVED###

    from sqlalchemy_api_handler import ApiHandler

    from models.content import Content
    from repository.clean import clean
    from repository.crowdtangle import attach_crowdtangle_entities_from_content

    clean()

    content = Content(url='https://www.youtube.com/watch?v=nFPeN17PVU8')
    ApiHandler.save(content)

    attach_crowdtangle_entities_from_content(content, 
                                             request_start_date='2019-09-01')

    print(len(content.quotedFromAppearances))
