from repository.clean import clean
from sandboxes.scripts import creators

def create_sandbox(name, **kwargs):
    clean()
    getattr(creators, name).create_sandbox(**kwargs)
