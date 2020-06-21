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
                '__SEARCH_BY__': 'type',
                'type': 'REVIEW',
            },
            {
                '__SEARCH_BY__': 'type',
                'type': 'VERDICT'
            }
        ],
        'type': 'ISSUE'
    })
