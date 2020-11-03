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

<<<<<<< HEAD
=======
LINK_INCLUDES = [
    {
        'key': 'linkingContent',
        'includes': [
            {
                'key': 'authorContents',
                'includes': ['author']
            },
            'medium'
        ]
    }
]
>>>>>>> 0f7a121 (rename appearance table into link)

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
        'key': 'whereItIsLinkedLinks',
        'includes': [
            {
                'key': 'linkingContent',
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
<<<<<<< HEAD
=======

VERDICT_INCLUDES = [
    'content',
    {
        'key': 'editor',
        'includes': USER_INCLUDES
    },
    'claim',
    'medium',
    {
        'key': 'reviews',
        'includes': [
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
>>>>>>> 0f7a121 (rename appearance table into link)
