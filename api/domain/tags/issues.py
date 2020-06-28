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
        'scopes': [
            {
                '__SEARCH_BY__': ['tagId', 'type'],
                'type': ScopeType.REVIEW,
            },
            {
                '__SEARCH_BY__': ['tagId', 'type'],
                'type': ScopeType.VERDICT
            }
        ],
        'type': TagType.ISSUE
    })
