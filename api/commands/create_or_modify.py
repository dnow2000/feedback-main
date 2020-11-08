from compose import compose
from pprint import pprint
import re
from flask import current_app as app
from sqlalchemy_api_handler import ApiHandler

from commands.filter import INDEXES, \
                            printify
from utils.database import db


@compose(app.manager.option('-m',
                            '--mode',
                            help='mode'),
         app.manager.option('-n',
                            '--name',
                            help='model name'),
         app.manager.option('-i',
                            '--includes',
                            help='includes'),
         app.manager.option('-s',
                            '--search',
                            help='__SEARCH_BY__ option'),
         *[app.manager.option('-i{}'.format(index),
                              '--item{}'.format(index),
                              help='item that filters')
           for index in INDEXES])
def create_or_modify(search='', **kwargs):
    model = ApiHandler.model_from_name(kwargs['name'].title()) \
        if kwargs['name'] != 'activity' else ApiHandler.get_activity()

    create_or_modify_kwargs = {}

    search = kwargs.get('search', kwargs['item1'].split(',')[0])
    if ',' in search:
        create_or_modify_kwargs['__SEARCH_BY__'] = search.split(',')
    else:
        create_or_modify_kwargs['__SEARCH_BY__'] = search

    for couple in kwargs.items():
        if not couple[1] or not re.match('item\d$', couple[0]):
            continue
        (key, value) = couple[1].split(',')
        create_or_modify_kwargs[key] =  value

    entity = model.create_or_modify(create_or_modify_kwargs)
    ApiHandler.save(entity)
    printify(entity, **kwargs)
