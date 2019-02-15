""" create_sandbox """
from repository.clean import clean_all_database
from sandboxes.scripts import creators

def create_sandbox(name, **kwargs):
    clean_all_database()
    getattr(creators, name).create_sandbox(**kwargs)
