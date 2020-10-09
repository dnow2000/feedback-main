from sandboxes import creators
from utils.db import clean


def create_sandbox(name,
                   with_clean=True,
                   **kwargs):
    if with_clean:
        clean()
    getattr(creators, name).create_sandbox(**kwargs)
