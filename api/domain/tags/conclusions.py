from models.tag import TagType


TAGS = [
    {
        'info': 'the statement of fact is consistent with available observations/data',
        'label': 'Accurate',
        'value': 2
    },
    {
        'info': 'the theory/hypothesis is consistent with available data and has not been disproven',
        'label': 'Correct',
        'value': 2
    },
    {
        'info': 'it needs more proofs to assert what it is said',
        'label': 'Evidencia Insuficiente',
        'value': 0
    },
    {
        'info': 'conclusion does not follow from the evidence presented',
        'label': 'Flawed Reasoning',
        'value': -1
    },
    {
        'info': 'it needs some clarification or additional information to be fully accurate',
        'value': 1
    },
    {
        'info': 'it overstates the confidence scientists actually have in the theory or it slightly distorts what can be predicted based on the theory',
        'label': 'Mostly Accurate',
        'value': 1
    },
    {
        'info': 'it uses ill-defined terms or lacks specifics so that one cannot unambiguously know what is meant without making additional unstated assumptions',
        'label': 'Imprecise',
        'value': 0
    },
    {
        'info': 'it makes a statement of fact in direct contradiction with available data',
        'label': 'Inaccurate',
        'value': -1
    },
    {
        'info': 'it provides an explanation or a theory whose predictions have been invalidated',
        'label': 'Incorrect',
        'value': -1
    },
    {
        'info': 'it leaves the reader with a false or poor understanding of how things work',
        'label': 'Misleading',
        'value': -1
    },
    {
        'info': 'it significantly overstates scientific confidence in a theory or distorts what can be predicted based on the theory',
        'label': 'Partially Correct',
        'value': 0
    },
    {
        'info': 'there is no scientific proof for such information',
        'label': 'Unfounded',
        'value': -2
    },
    {
        'info': 'the reference used to support the claim is non-existent, of low scientific credibility or insufficient',
        'label': 'Unsupported',
        'value': -2
    }
]

for tag in TAGS:
    tag.update({
        '__SEARCH_BY__': ['label', 'type'],
        'id': '__NEXT_ID_IF_NOT_EXISTS__',
        'type': TagType.CONCLUSION
    })
