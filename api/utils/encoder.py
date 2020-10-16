# pylint: disable=R0903
from domain.graph import Graph
from enum import Enum

from flask.json import JSONEncoder


class EnumJSONEncoder(JSONEncoder):
    def default(self, obj):
        try:
            if isinstance(obj, Enum):
                return str(obj)
            iterable = [
                {
                    'key': '.'.join(str(element).split('.')[1:]),
                    'value': element.value
                }
                for element in obj
            ]
        except TypeError:
            pass
        else:
            return iterable
        return JSONEncoder.default(self, obj)



class GraphJSONEncoder(EnumJSONEncoder):
    def default(self, obj):
        if isinstance(obj, Graph):
            return {
                **obj.__dict__,
                'nodes': [obj.json_from(node) for node in obj.nodes]
            }
        return EnumJSONEncoder.default(self, obj)


AppJSONEncoder = GraphJSONEncoder
