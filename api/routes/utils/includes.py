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

ARTICLE_INCLUDES = [
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
        'key': 'articleTags',
        'includes': [
            {
                'key': 'tag',
                'includes': TAG_INCLUDES
            }
        ]
    }
]

REVIEW_INCLUDES = [
    'article',
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

AUTHOR_ARTICLE_INCLUDES = [
    'article'
]

VERDICT_INCLUDES = [
    'article',
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
