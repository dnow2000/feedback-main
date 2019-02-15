from models.scope import Scope

def create_scope(tag, scope_type):
    scope = Scope()
    scope.type = scope_type
    scope.tag = tag

    return scope
