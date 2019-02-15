import os
from flask_script import Manager
from flask import Flask

from models.utils.db import db

app = Flask(__name__)
app.secret_key = os.environ.get('FLASK_SECRET', '+%+3Q23!zbc+!Dd@')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('POSTGRES_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
db.app = app

def create_app(env=None):
    app.env = env
    return app

app.manager = Manager(create_app)

with app.app_context():
    import scripts

if __name__ == "__main__":
    app.manager.run()
