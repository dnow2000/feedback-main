from repository.database import clean
import sandboxes.creators as creators


def create_sandbox(name, **kwargs):
    clean()
    getattr(creators, name).create_sandbox(**kwargs)
