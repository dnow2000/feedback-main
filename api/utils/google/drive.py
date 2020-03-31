from io import BytesIO
from datetime import datetime
import os
from googleapiclient.http import HttpError, \
                                 MediaIoBaseDownload, \
                                 MediaIoBaseUpload
from sqlalchemy_api_handler import ApiErrors
from werkzeug.utils import secure_filename

from utils.date import strftime, strptime
from utils.google.service import create_google_service


NOT_ALLOWED_EXTENSIONS = ['exe', 'js']


def find_folders_from_name(
    name,
    drive_id=None,
    parent_folder_id=None,
    service_account_string=None
):
    query = "mimeType = 'application/vnd.google-apps.folder' and name = '{}' and trashed = false".format(name)
    if parent_folder_id:
        query = "{} and parents = '{}'".format(query, parent_folder_id)

    drive_id_kwargs = {}
    if drive_id:
        drive_id_kwargs = {
            "corpora": 'drive',
            "driveId": drive_id,
            "includeItemsFromAllDrives": True,
            "supportsAllDrives": True
        }

    response = create_google_service('drive', service_account_string).files() \
                    .list(
                        fields='files(id,name,parents)',
                        q=query,
                        spaces='drive',
                        **drive_id_kwargs
                    ).execute()

    return response['files']


def delete_file_or_folder(
    file_or_folder_id,
    service_account_string=None
):
    body = {'trashed': True}
    return create_google_service('drive', service_account_string).files() \
            .update(
                body=body,
                fileId=file_or_folder_id,
                supportsAllDrives=True) \
            .execute()


def find_files_from_name(
    name,
    drive_id=None,
    parent_folder_id=None,
    service_account_string=None
):
    query = "name = '{}' and trashed = false".format(name)
    if parent_folder_id:
        query = "{} and parents = '{}'".format(query, parent_folder_id)

    drive_id_kwargs = {}
    if drive_id:
        drive_id_kwargs = {
            "corpora": 'drive',
            "driveId": drive_id,
            "includeItemsFromAllDrives": True,
            "supportsAllDrives": True
        }

    response = create_google_service('drive', service_account_string).files() \
                .list(
                    fields='files(id,modifiedTime,name,parents)',
                    q=query,
                    spaces='drive',
                    **drive_id_kwargs) \
                .execute()

    return response['files']


def get_file_media(
    file_id,
    service_account_string=None
):
    request = create_google_service('drive', service_account_string).files() \
                .get_media(fileId=file_id)
    file_media = BytesIO()
    media_request = MediaIoBaseDownload(file_media, request)
    is_done = False
    while is_done is False:
        status, is_done = media_request.next_chunk()
    file_media.seek(0)
    return file_media


def not_allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in NOT_ALLOWED_EXTENSIONS


def create_file(
    file_media,
    drive_id=None,
    parent_folder_id=None,
    service_account_string=None
):
    if not parent_folder_id:
        parent_folder_id = drive_id

    filename = secure_filename(file_media.filename)
    media_body = MediaIoBaseUpload(file_media, mimetype=file_media.mimetype)

    return create_google_service('drive', service_account_string).files() \
                .create(
                    body={
                        "mimeType": file_media.mimetype,
                        "name": filename,
                        'parents': [parent_folder_id]
                    },
                    media_body=media_body,
                    supportsAllDrives=True) \
                .execute()


def modify_file(
    file_media,
    drive_id=None,
    parent_folder_id=None,
    service_account_string=None
):
    filename = secure_filename(file_media.filename)
    media_body = MediaIoBaseUpload(file_media, mimetype=file_media.mimetype)

    return create_google_service('drive', service_account_string).files() \
                .update(
                    body={
                        "mimeType": file_media.mimetype,
                        "name": filename,
                    },
                    fileId=file.get('id'),
                    media_body=media_body) \
                .execute()


def touch(
    file_id,
    date=None,
    service_account_string=None
):
    if date is None:
        date = datetime.utcnow()

    return create_google_service('drive', service_account_string).files() \
            .update(
                body={
                    "modifiedTime": strftime(date)
                },
                fileId=file_id,
                supportsAllDrives=True) \
            .execute()


def _find_folder_from_name(
    name,
    drive_id=None,
    force_create=False,
    parent_folder_id=None,
    service_account_string=None
):
    body = {
        'mimeType': 'application/vnd.google-apps.folder',
        'name': name
    }

    if not parent_folder_id:
        parent_folder_id = drive_id

    body['parents'] = [parent_folder_id]

    folders = find_folders_from_name(
        name,
        drive_id=drive_id,
        parent_folder_id=parent_folder_id,
        service_account_string=service_account_string
    )

    folders_count = len(folders)
    if folders_count == 1:
        return folders[0]

    if folders_count > 1:
        errors = ApiErrors()
        errors.add_error('name', 'Found several folders for this name')
        raise errors

    if force_create:
        return create_google_service('drive', service_account_string).files() \
                .create(
                    body=body,
                    fields='id',
                    supportsAllDrives=True) \
                .execute()

    errors = ApiErrors()
    errors.add_error('folder', '{} folder was not found.'.format(name))
    raise errors


def find_folder_from_path(
    path,
    drive_id=None,
    force_create=False,
    root_folder_id=None,
    service_account_string=None,
):
    if path.startswith('/'):
        path = path[1:]

    if path is None \
       or path == '':
        return {'id': root_folder_id}

    folder_names = path.split('/')

    parent_folder_id = root_folder_id
    for folder_name in folder_names:
        parent_folder = _find_folder_from_name(
            folder_name,
            drive_id=drive_id,
            force_create=force_create,
            parent_folder_id=parent_folder_id,
            service_account_string=service_account_string
        )
        parent_folder_id = parent_folder.get('id')

    return parent_folder


def find_file_from_name(
    name,
    drive_id=None,
    parent_folder_id=None,
    service_account_string=None
):
    files = find_files_from_name(
        name,
        drive_id=drive_id,
        parent_folder_id=parent_folder_id,
        service_account_string=service_account_string
    )

    files_count = len(files)
    if files_count == 1:
        return files[0]

    if files_count > 1:
        errors = ApiErrors()
        errors.add_error('file', 'Found several files for this name')
        raise errors


def sync_asset_file(
    file_media,
    date=None,
    drive_id=None,
    parent_folder_id=None,
    service_account_string=None
):

    file = find_file_from_name(
        file_media.filename,
        drive_id=drive_id,
        parent_folder_id=parent_folder_id,
        service_account_string=service_account_string
    )

    do_touch = False
    if not file:
        file = create_file(file_media,
            drive_id=drive_id,
            parent_folder_id=parent_folder_id,
            service_account_string=service_account_string,
        )
        do_touch = True
    elif strptime(file.get('modifiedTime')) < strptime(date):
        modify_file(file_media,
            drive_id=drive_id,
            parent_folder_id=parent_folder_id,
            service_account_string=service_account_string,
        )
        do_touch = True

    if do_touch:
        touch(file.get('id'),
              date=date,
              service_account_string=service_account_string)
    return file
