from datetime import datetime

from models.mixins.soft_deletable_mixin import SoftDeletableMixin

def soft_delete_objects(*objects):
    return list(map(_soft_delete, objects))

def _soft_delete(obj: SoftDeletableMixin):
    obj.isSoftDeleted = True
    return obj
