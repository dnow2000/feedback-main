from repository.clean import with_clean_all_database
from sandboxes.scripts import creators

def create_sandbox(name, **kwargs):
    with_clean_all_database()
    getattr(creators, name).create_sandbox(**kwargs)
