from pprint import pprint
from sqlalchemy import BigInteger, \
                       Column

from models.manager.as_dict import as_dict
from models.manager.populate import Populate
from models.manager.save import Save
from utils.human_ids import humanize

class Manager(
        Save,
        as_dict,
        Populate
):
    id = Column(BigInteger,
                primary_key=True,
                autoincrement=True)

    def dump(self):
        pprint(vars(self))

    def __repr__(self):
        self_id = "unsaved"\
               if self.id is None\
               else str(self.id) + "/" + humanize(self.id)
        return '<%s #%s>' % (self.__class__.__name__, self_id)
