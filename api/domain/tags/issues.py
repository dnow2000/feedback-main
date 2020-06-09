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
        'scopeTypes': ['review', 'verdict'],
        'type': 'issue'
    })
