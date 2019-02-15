from sqlalchemy import and_

from models.scope import Scope
from models.tag import Tag

def filter_tags_with_scopes(query, scopes):
    scopes_filter = and_(*[Tag.scopes.any(Scope.type == scope) for scope in scopes])
    query = query.filter(scopes_filter)
    return query
