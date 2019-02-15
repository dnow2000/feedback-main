TAG_INCLUDES = [
    "scopes"
]

USER_INCLUDES = [
    "-password",
    "roles",
    {
        "key": "userTags",
        "includes": [
            {
                "key": "tag",
                "includes": TAG_INCLUDES
            }
        ]
    }
]

ARTICLE_INCLUDES = [
    {
        "key": "reviews",
        "includes": [
            {
                "key": "user",
                "includes": USER_INCLUDES
            }
        ]
    },
    {
        "key": "verdicts",
        "includes": [
            {
                "key": "user",
                "includes": USER_INCLUDES
            }
        ]
    },
    {
        "key": "articleTags",
        "includes": [
            {
                "key": "tag",
                "includes": TAG_INCLUDES
            }
        ]
    }
]

REVIEW_INCLUDES = [
    "article",
    "evaluation",
    {
        "key": "user",
        "includes": USER_INCLUDES
    },
    {
        "key": "reviewTags",
        "includes": [
            {
                "key": "tag",
                "includes": TAG_INCLUDES
            }
        ]
    },
    {
        "key": "verdicts",
        "includes": [
            "verdictUsers"
        ]
    }
]

VERDICT_INCLUDES = [
    "article",
    {
        "key": "user",
        "includes": USER_INCLUDES
    },
    {
        "key": "reviews",
        "includes": [
            'evaluation',
            'user'
        ]
    },
    {
        "key": "verdictTags",
        "includes": [
            {
                "key": "tag",
                "includes": TAG_INCLUDES
            }
        ]
    },
    {
        "key": "verdictUsers",
        "includes": [
            {
                "key": "user",
                "includes": USER_INCLUDES
            }
        ]
    }
]
