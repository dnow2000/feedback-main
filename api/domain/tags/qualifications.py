TAGS = [
    {
        'info': 'free from factual errors, describes reality in a way that is consistent with available data/observations',
        'label': 'Accurate',
        'positivity': 1
    },
    {
        'info': 'holds some ideas (persons) as true (right) without proper justification, lack of objectivity, ideological',
        'label': 'Biased',
        'positivity': -1
    },
    {
        'info': 'highlights only a subset of all the available relevant evidence that seem to confirm a particular conclusion, ignoring a significant portion of evidence that would contradict it',
        'label': 'Cherry Picking',
        'positivity': 0
    },
    {
        'info': 'article does not appropriately support its title',
        'label': 'Clickbait Headline',
        'positivity': 0
    },
    {
        'info': 'resents opinion as fact or fact as opinion',
        'label': 'Conflates Facts And Opinions',
        'positivity': 0
    },
    {
        'info': 'overstates / exaggerates the significance of some findings. (e.g. claims that a new scientific study overturns previous knowledge while it is an incremental update)',
        'label': 'Exaggerating',
        'positivity': 0
    },
    {
        'info': 'conclusion does not follow from the evidence presented',
        'label': 'Flawed Reasoning',
        'positivity': -1
    },
    {
        'info': 'uses ill-defined terms or lacks specifics so that one cannot unambiguously know what is meant without making additional unstated assumptions',
        'label': 'Imprecise / Unclear',
        'positivity': 0
    },
    {
        'info': 'contains statement of fact in direct contradiction with available observations/data',
        'label': 'Inaccurate',
        'positivity': -1
    },
    {
        'info': 'relies on low credibility sources, provides no or insufficient evidence in support of claims made',
        'label': 'Inappropriate Backing',
        'positivity': 0
    },
    {
        'info': 'offers a deep understanding of the issue based on accurate information and proper conlabel that clarifies the implications of observations',
        'label': 'Insightful',
        'positivity': 1
    },
    {
        'info': 'lack of observations or explanations that would change the reader’s takeaway',
        'label': 'Lack Of Conlabel',
        'positivity': 0
    },
    {
        'info': 'offers an incorrect impression on some aspect(s) of the science, leaves the reader with false understanding of how things work, for instance by omitting necessary background conlabel',
        'label': 'Misleading',
        'positivity': -1
    },
    {
        'info': 'presents a conclusion as conclusive while the hypothesis is still being investigated and there remains genuine scientific uncertainty about it',
        'label': 'Overstates Scientific Confidence',
        'positivity': 0
    },
    {
        'info': 'substitutes a misrepresentation of a source’s conclusion for its actual conclusion, often in order to make it easier to discredit the idea of an \'opponent\'',
        'label': 'Misrepresentation Of Sources (strawman)',
        'positivity': 0
    },
    {
        'info': 'conclusion follows from the evidence presented',
        'label': 'Sound Reasoning',
        'positivity': 1
    },
    {
        'info': 'not biased, impartial, weighs evidence for/against ideas',
        'label': 'Unbiased',
        'positivity': 1
    },
    {
        'info': 'article fails to disclose a conflict of interest with a strong likelihood of influencing a source’s conclusions',
        'label': 'Undisclosed Conflict Of Interest',
        'positivity': 0
    }
]

for tag in TAGS:
    tag.update({
        'scopes': [{'__SEARCH_BY__': 'type', 'type': 'REVIEW'}],
        'type': 'QUALIFICATION'
    })
