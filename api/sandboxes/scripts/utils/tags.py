ARTICLE_TAGS = [
    {
        "text": "climate"
    },
    {
        "text": "health"
    }
]

REVIEW_VERDICT_TAGS = [
    {
        "info": "free from factual errors, describes reality in a way that is consistent with available data/observations",
        "text": "accurate",
        "positivity": 1,
    },
    {
        "info": "holds some ideas (persons) as true (right) without proper justification, lack of objectivity, ideological",
        "text": "biased",
        "positivity": -1,
    },
    {
        "info": "highlights only a subset of all the available relevant evidence that seem to confirm a particular conclusion, ignoring a significant portion of evidence that would contradict it",
        "text": "cherry picking",
        "positivity": 0,
    },
    {
        "info": "article does not appropriately support its title",
        "text": "clickbait headline",
        "positivity": 0,
    },
    {
        "info": "resents opinion as fact or fact as opinion",
        "text": "conflates facts and opinions",
        "positivity": 0,
    },
    {
        "info": "overstates / exaggerates the significance of some findings. (e.g. claims that a new scientific study overturns previous knowledge while it is an incremental update)",
        "text": "exaggerating",
        "positivity": 0,
    },
    {
        "info": "conclusion does not follow from the evidence presented",
        "text": "flawed reasoning",
        "positivity": -1,
    },
    {
        "info": "uses ill-defined terms or lacks specifics so that one cannot unambiguously know what is meant without making additional unstated assumptions",
        "text": "imprecise / unclear",
        "positivity": 0,
    },
    {
        "info": "contains statement of fact in direct contradiction with available observations/data",
        "text": "inaccurate",
        "positivity": -1,
    },
    {
        "info": "relies on low credibility sources, provides no or insufficient evidence in support of claims made",
        "text": "inappropriate backing",
        "positivity": 0,
    },
    {
        "info": "offers a deep understanding of the issue based on accurate information and proper context that clarifies the implications of observations",
        "text": "insightful",
        "positivity": 1,
    },
    {
        "info": "lack of observations or explanations that would change the reader’s takeaway",
        "text": "lack of context",
        "positivity": 0,
    },
    {
        "info": "offers an incorrect impression on some aspect(s) of the science, leaves the reader with false understanding of how things work, for instance by omitting necessary background context",
        "text": "misleading",
        "positivity": -1,
    },
    {
        "info": "presents a conclusion as conclusive while the hypothesis is still being investigated and there remains genuine scientific uncertainty about it",
        "text": "overstates scientific confidence",
        "positivity": 0,
    },
    {
        "info": "substitutes a misrepresentation of a source’s conclusion for its actual conclusion, often in order to make it easier to discredit the idea of an \"opponent\"",
        "text": "misrepresentation of sources (strawman)",
        "positivity": 0,
    },
    {
        "info": "conclusion follows from the evidence presented",
        "text": "sound reasoning",
        "positivity": 1,
    },
    {
        "info": "not biased, impartial, weighs evidence for/against ideas",
        "text": "unbiased",
        "positivity": 1,
    },
    {
        "info": "article fails to disclose a conflict of interest with a strong likelihood of influencing a source’s conclusions",
        "text": "undisclosed conflict of interest",
        "positivity": 0,
    }
]

USER_TAGS = [
    {"text": "carbon cycle"},
    {"text": "coral"},
    {"text": "drought"},
    {"text": "immunology"},
    {"text": "ocean biogeochemistry and acidification"}
]

ALL_TAGS = ARTICLE_TAGS +  REVIEW_VERDICT_TAGS + USER_TAGS
