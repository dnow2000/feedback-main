import inflect
import os
from pathlib import Path
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.utils import humanize

from utils.ovh.object import store_public_object
from utils.ovh.thumb import save_thumb


inflect_engine = inflect.engine()

MIMES_BY_FOLDER = {
    'spreadsheets': 'application/CSV',
    'thumbs': 'image/jpeg',
    'zips': 'application/zip'
}


def store_public_object_from_sandbox_assets(folder, public_object, thumb_id, index=0):
    dir_path = Path(os.path.dirname(os.path.realpath(__file__)))
    plural_model_name = inflect_engine.plural(public_object.__class__.__name__.lower())
    thumb_path = dir_path\
                 / folder / plural_model_name\
                 / str(thumb_id)

    with open(thumb_path, mode='rb') as thumb_file:
        if folder == "thumbs":
            save_thumb(public_object,
                       thumb_file.read(),
                       index,
                       convert=False,
                       symlink_path=thumb_path)
        else:
            store_public_object(folder,
                                plural_model_name + '/' + humanize(public_object.id),
                                thumb_file.read(),
                                MIMES_BY_FOLDER[folder],
                                symlink_path=thumb_path)

    ApiHandler.save(public_object)
