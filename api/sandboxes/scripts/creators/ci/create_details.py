def create_details():
    # TODO
    return [
        {
            "info": "it is a statement of fact in direct contradiction with available observations/data",
            "issueLabel": "Accuracy",
            "label": "Factually inaccurate"
        },
        {
            "info": "it presents opinion as fact or fact as opinion",
            "issueLabel": "Accuracy",
            "label": "Conflates factual statement and opinion"
        },
        {
            "info": "the theory/hypothesis is consistent with available data and has not been disproven",
            "issueLabel": "Explanation",
            "label": "Correct"
        },
        {
            "info": "it leaves the reader with a false or poor understanding of how things work",
            "issueLabel": "Explanation",
            "label": "Misleading"
        },
        {
            "info": "it fails to recognize that an observation can be influenced by more than one factor",
            "issueLabel": "Explanation",
            "label": "Misrepresents a complex reality"
        },
        {
            "info": "it uses an observation in support of a conclusion that it does not support",
            "issueLabel": "Explanation",
            "label": "Fails to grasp significance of observation"
        },
        {
            "info": "it lacks elements of context (observations or explanations) that would change the reader’s takeaway",
            "issueLabel": "Context",
            "label": "Lack of context"
        },
        {
            "info": "it depends on highlighting only a subset of all the available relevant evidence",
            "issueLabel": "Context",
            "label": "Cherry-picking"
        },
        {
            "info": "it presents a conclusion as conclusive while the hypothesis is still being investigated and there remains genuine scientific uncertainty about it",
            "issueLabel": "Context",
            "label": "Overstates scientific confidence"
        },
        {
            "id": "58c2b134aa5a9bbb6928c6cb",
            "info": "when a new scientific study overturns all previous knowledge when, in reality, it is just an incremental update",
            "issueLabel": "Context",
            "label": "Overstates the scientific impact of a finding"
        },
        {
            "info": "the reference used to support the claim is non-existent, of low scientific credibility or insufficient (according to the principle that extraordinary claims require extraordinary evidence",
            "issueLabel": "58c2c134765aab043428c6cb",
            "label": "Inadequate support"
        },
        {
            "info": "it substitutes a misrepresentation of a source’s conclusion for its actual conclusion, often in order to make it easier to discredit the idea of an opponent",
            "issueLabel": "Sources",
            "label": "Misrepresents source (Strawman)"
        },
        {
            "info": "it is too broad or vague, or lacking supporting details, to be clearly verifiable",
            "issueLabel": "Precision or clarity of language",
            "label": "Lacks specifics"
        },
        {
            "info": "it uses a scientific term in a way that does not refer to the concept in the same way it is used in science",
            "issueLabel": "Precision or clarity of language",
            "label": "Imprecise"
        }
    ]
