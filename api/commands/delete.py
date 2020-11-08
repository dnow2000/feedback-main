from compose import compose
from pprint import pprint
from flask import current_app as app

from commands.filter import INDEXES, query_filter_from
from utils.database import db


@compose(app.manager.option('-n',
                            '--name',
                            help='model name'),
         app.manager.option('-s',
                            '--soft',
                            help='is soft delete'),
         *[app.manager.option('-i{}'.format(index),
                              '--item{}'.format(index),
                              help='item filtering')
           for index in INDEXES])
def delete(**kwargs):
    query = query_filter_from(**kwargs)
    if kwargs.get('soft') == 'true':
        entities = query.all()
        for entity in query.all():
            entity.isSoftDeleted = True
        ApiHandler.save(entities)
        return pprint('{} soft deleted'.format(len(entities)))
    result = query.delete()
    db.session.commit()
    pprint('{} deleted'.format(result))
