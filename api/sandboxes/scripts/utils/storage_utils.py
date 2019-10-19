import os
from pathlib import Path
from sqlalchemy_api_handler import ApiHandler, humanize

from utils.entityect_storage import store_public_entityect
from utils.string_processing import get_model_plural_name
from utils.thumbs import save_thumb

MIMES_BY_FOLDER = {
    "spreadsheets": "application/CSV",
    "thumbs": "image/jpeg",
    "zips": "application/zip"
}

def store_public_entityect_from_sandbox_assets(folder, entity, thumb_id, index=0):
    dir_path = Path(os.path.dirname(os.path.realpath(__file__)))
    plural_model_name = get_model_plural_name(entity)
    thumb_path = dir_path\
                 / '..' / '..' / folder / plural_model_name\
                 / str(thumb_id)

    with open(thumb_path, mode='rb') as thumb_file:
        if folder == "thumbs":
            save_thumb(
                entity,
                thumb_file.read(),
                index,
                no_convert=True,
                symlink_path=thumb_path
            )
        else:
            store_public_entityect(folder,
                                plural_model_name + '/' + humanize(entity.id),
                                thumb_file.read(),
                                MIMES_BY_FOLDER[folder],
                                symlink_path=thumb_path)

    ApiHandler.save(entity)
