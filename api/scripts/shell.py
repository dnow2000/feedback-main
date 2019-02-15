import os
from flask import Flask

from models.utils.db import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('POSTGRES_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
db.app = app

# IMPORT A LOT OF TOOLS TO MAKE THEM AVAILABLE
# IN THE PYTHON SHELL
from models.manager import *
from models.mixins import *
from models import *
from repository import *
from domain import *
from sandboxes import *
from sqlalchemy import *
from utils.credentials import *
from utils.human_ids import *
from utils.includes import *
