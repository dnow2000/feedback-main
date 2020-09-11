from pprint import pprint
import traceback
from flask import current_app as app

from repository.clean import clean as clean_database
from models.content import Content
from models.appearance import Appearance


@app.manager.command
def dev():

    #### PUT HERE YOUR CODE TO BE DEVED ###
