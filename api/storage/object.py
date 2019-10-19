import os
from datetime import datetime
from pathlib import Path, PurePath
import swiftclient

from utils.config import IS_DEV

def get_storage_base_url():
    return os.environ.get('OBJECT_STORAGE_URL')


def swift_con():
    user = os.environ.get('OVH_USER')
    key = os.environ.get('OVH_PASSWORD')
    tenant_name = os.environ.get('OVH_TENANT_NAME')
    auth_url = 'https://auth.cloud.ovh.net/v2.0/'
    options = {
        'region_name': os.environ.get('OVH_REGION_NAME')
    }
    auth_version = '2'
    return swiftclient.Connection(user=user,
                                  key=key,
                                  authurl=auth_url,
                                  os_options=options,
                                  tenant_name=tenant_name,
                                  auth_version=auth_version)


STORAGE_DIR = Path(os.path.dirname(os.path.realpath(__file__)))\
              / '..' / 'static' / 'object_store_data'


def local_dir(bucket, object_id):
    if '/' in object_id:
        id_folders = PurePath(object_id).parent
    else:
        id_folders = ''
    return STORAGE_DIR / bucket / id_folders


def local_path(bucket, object_id):
    return local_dir(bucket, object_id) / PurePath(object_id).name


def store_public_object(bucket, object_id, blob, content_type, symlink_path=None):
    if IS_DEV:
        os.makedirs(local_dir(bucket, object_id), exist_ok=True)

        file_local_path = local_path(bucket, object_id)

        new_type_file = open(str(file_local_path) + ".type", "w")
        new_type_file.write(content_type)

        if symlink_path and not os.path.isfile(file_local_path) and not os.path.islink(file_local_path):
            os.symlink(symlink_path, file_local_path)
            return

        new_file = open(file_local_path, "wb")
        new_file.write(blob)
    else:
        container_name = os.environ.get('OVH_BUCKET_NAME')
        storage_path = 'thumbs/' + object_id
        swift_con().put_object(container_name,
                               storage_path,
                               contents=blob,
                               content_type=content_type)


def delete_public_object(bucket, object_id):
    lpath = local_path(bucket, object_id)
    if os.path.isfile(lpath):
        os.remove(lpath)


def get_public_object_date(bucket, object_id):
    lpath = local_path(bucket, object_id)
    if not os.path.isfile(lpath):
        return None
    return datetime.fromtimestamp(os.path.getmtime(lpath))
