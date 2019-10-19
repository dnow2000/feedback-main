import io
import requests
from sqlalchemy import Column,\
                       Integer
from sqlalchemy_api_handler import humanize

from utils.inflect import inflect_engine
from utils.object_storage import delete_public_object, \
                                 get_public_object_date, \
                                 get_storage_base_url
from utils.string_processing import get_model_plural_name

IDEAL_THUMB_WIDTH = 600

class HasThumbMixin(object):
    thumbCount = Column(Integer(), nullable=False, default=0)

    def delete_thumb(self, index):
        delete_public_object("thumbs", self.get_thumb_storage_id(index))

    def thumb_date(self, index):
        return get_public_object_date("thumbs", self.get_thumb_storage_id(index))

    def get_thumb_storage_id(self, index):
        if self.id is None:
            raise ValueError("Trying to get get_thumb_storage_id for an unsaved object")
        return inflect_engine.plural(self.__class__.__name__.lower()) + "/"\
                                     + humanize(self.id)\
                                     + (('_' + str(index)) if index > 0 else '')

    @property
    def thumbUrl(self):
        base_url = get_storage_base_url()
        thumb_url = base_url + "/thumbs"
        return '{}/{}/{}'.format(thumb_url, get_model_plural_name(self), humanize(self.id))
