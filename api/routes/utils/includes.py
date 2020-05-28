TAG_INCLUDES = [
    'scopes'
]

USER_INCLUDES = [
    '-password',
    'roles',
    {
        'key': 'userTags',
        'includes': [
            {
                'key': 'tag',
                'includes': TAG_INCLUDES
            }
        ]
    }
]

CONTENT_INCLUDES = [
    {
        'key': 'reviews',
        'includes': [
            {
                'key': 'reviewer',
                'includes': USER_INCLUDES
            }
        ]
    },
    {
        'key': 'verdicts',
        'includes': [
            {
                'key': 'editor',
                'includes': USER_INCLUDES
            }
        ]
    },
    {
        'key': 'contentTags',
        'includes': [
            {
                'key': 'tag',
                'includes': TAG_INCLUDES
            }
        ]
    }
]

REVIEW_INCLUDES = [
    'content',
    'evaluation',
    {
        'key': 'reviewer',
        'includes': USER_INCLUDES
    },
    {
        'key': 'reviewTags',
        'includes': [
            {
                'key': 'tag',
                'includes': TAG_INCLUDES
            }
        ]
    },
    {
        'key': 'verdicts',
        'includes': [
            'verdictReviewers'
        ]
    }
]

AUTHOR_CONTENT_INCLUDES = [
    'content'
]

VERDICT_INCLUDES = [
    'content',
    {
        'key': 'editor',
        'includes': USER_INCLUDES
    },
    {
        'key': 'reviews',
        'includes': [
            'evaluation',
            'reviewer'
        ]
    },
    {
        'key': 'verdictTags',
        'includes': [
            {
                'key': 'tag',
                'includes': TAG_INCLUDES
            }
        ]
    },
    {
        'key': 'verdictReviewers',
        'includes': [
            {
                'key': 'reviewer',
                'includes': USER_INCLUDES
            }
        ]
    }
]
