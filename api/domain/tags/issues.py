from models.scope import ScopeType
from models.tag import TagType


TAGS = [
    {
        'label': 'Accuracy'
    },
    {
        'label': 'Explanation'
    },
    {
        'label': 'Context'
    },
    {
        'label': 'Representation of the scientific process'
    },
    {
        'label': 'Sources'
    },
    {
        'label': 'Precision or clarity of language'
    }
]

for tag in TAGS:
    tag.update({
        '__SEARCH_BY__': ['label', 'type'],
        'id': '__NEXT_ID_IF_NOT_EXISTS__',
        'scopes': [
            {
                '__SEARCH_BY__': ['tagId', 'type'],
                'tagId': {
                    'humanized': True,
                    'key': 'id',
                    'type': '__PARENT__'
                },
                'type': ScopeType.REVIEW,
            },
            {
                '__SEARCH_BY__': ['tagId', 'type'],
                'tagId': {
                    'humanized': True,
                    'key': 'id',
                    'type': '__PARENT__'
                },
                'type': ScopeType.VERDICT
            }
        ],
        'type': TagType.ISSUE
    })
