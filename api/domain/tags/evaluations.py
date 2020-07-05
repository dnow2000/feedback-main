from models.scope import ScopeType
from models.tag import SourceName, TagType


TAGS = [
    {
        'info': 'It describes an observation in a way that is consistent with available data and does not leave out any relevant element of context or it is a theory that has been well tested in scientific studies and generates expected observations that are confirmed by actual observations',
        'label':  'Very High',
        'scopes': [
            {
                'type': ScopeType.REVIEW
            }
        ],
        'source': SourceName.CONTENT,
        'value': 2
    },
    {
        'info': 'It needs some clarification or additional information to be fully accurate or it presents a theory that is well tested in scientific studies, but its formulation in the claim might overstate the confidence scientists actually have in the theory or slightly distort what can be predicted based on the theory',
        'label': 'High',
        'scopes': [
            {
                'type': ScopeType.REVIEW
            }
        ],
        'source': SourceName.CLAIM,
        'value': 1
    },
    {
        'info': 'It leaves out important information or is made out of context',
        'label': 'Neutral',
        'scopes': [
            {
                'type': ScopeType.REVIEW
            }
        ],
        'source': SourceName.CLAIM,
        'value': 0
    },
    {
        'info': 'It is made without backing from an adequate reference or the available evidence does not support the statement or it contains an element of truth but leaves the reader with a false understanding of reality',
        'label': 'Low',
        'scopes': [
            {
                'type': ScopeType.REVIEW
            }
        ],
        'source': SourceName.CLAIM,
        'value': -1
    },
    {
        'info': 'It is clearly wrong',
        'label': 'Very Low',
        'scopes': [
            {
                'type': ScopeType.REVIEW
            }
        ],
        'source': SourceName.CLAIM,
        'value': -2
    },
    {
        'info': 'No inaccuracies, fairly represents the state of scientific knowledge, well argued and documented, references are provided for key elements. The content provides insights to the reader about scientific mechanisms and implications, as well as limitations and important unknowns surrounding the evidence.',
        'label': 'Very High',
        'scopes': [
            {
                'type': ScopeType.REVIEW
            }
        ],
        'source': SourceName.CONTENT,
        'value': 2
    },
    {
        'info': 'The content does not contain scientific inaccuracies and its conclusion follows from the evidence provided. While more detail would have been useful, readers are still accurately informed of the science.',
        'label': 'High',
        'scopes': [
            {
                'type': ScopeType.REVIEW
            }
        ],
        'source': SourceName.CONTENT,
        'value': 1
    },
    {
        'info': 'No significant errors, but not enough insight either to inform the reader.',
        'label': 'Neutral',
        'scopes': [
            {
                'type': ScopeType.REVIEW
            }
        ],
        'source': SourceName.CONTENT,
        'value': 0
    },
    {
        'info': 'The content contains significant scientific inaccuracies or misleading statements.',
        'label': 'Low',
        'scopes': [
            {
                'type': ScopeType.REVIEW
            }
        ],
        'source': SourceName.CONTENT,
        'value': -1
    },
    {
        'info': 'The content contains major scientific inaccuracies for key facts supporting argumentation, and/or omits important information, and/or presents logical flaws in using information to reach conclusions.',
        'label': 'Very Low',
        'scopes': [
            {
                'type': ScopeType.REVIEW
            }
        ],
        'source': SourceName.CONTENT,
        'value': -2
    },
    {
        'info': 'The content does not build on scientifically verifiable information (e.g. it is mostly about policy, politics or opinions).',
        'label': 'Not applicable',
        'scopes': [
            {
                'type': ScopeType.REVIEW
            }
        ],
        'source': SourceName.CONTENT,
        'value': None
    }
]

for tag in TAGS:
    tag.update({
        '__SEARCH_BY__': ['label', 'type'],
        'id': '__NEXT_ID_IF_NOT_EXISTS__',
        'type': TagType.EVALUATION
    })
    for scope in tag['scopes']:
        scope.update({
            '__SEARCH_BY__': ['tagId', 'type'],
            'tagId': {
                'humanized': True,
                'key': 'id',
                'type': '__PARENT__'
            },
        })
