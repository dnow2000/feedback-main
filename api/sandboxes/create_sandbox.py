from sandboxes import creators
from utils.database import delete


def create_sandbox(name,
                   with_delete=True,
                   **kwargs):
    if with_delete:
        delete()
    getattr(creators, name).create_sandbox(**kwargs)
