TAGS = [
    {
        'label': 'Climate'
    },
    {
        'label': 'Coral'
    },
    {
        'label': 'Health'
    },
    {
        'label': 'Immunology'
    }
]

for tag in TAGS:
    tag.update({
        '__SEARCH_BY__': ['label', 'type'],
        'id': '__NEXT_ID_IF_NOT_EXISTS__'
    })
