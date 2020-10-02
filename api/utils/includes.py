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

APPEARANCE_INCLUDES = [
    {
        'key': 'quotingContent',
        'includes': [
            {
                'key': 'authorContents',
                'includes': ['author']
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

CLAIM_INCLUDES = [
    {
        'key': 'quotedFromAppearances',
        'includes': [
            {
                'key': 'quotingContent',
                'includes': [
                    {
                        'key': 'authorContents',
                        'includes': ['author']
                    }
                ]
            },
            'stance'
        ]
    }
]

VERDICT_INCLUDES = [
    'content',
    {
        'key': 'editor',
        'includes': USER_INCLUDES
    },
    {
        'key': 'claim',
        'includes': CLAIM_INCLUDES
    },
    'medium',
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
