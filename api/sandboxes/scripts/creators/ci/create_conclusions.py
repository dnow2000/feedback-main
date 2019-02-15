def create_conclusions():
    return
    # TODO
    conclusions = [
        {
            "evaluationType": "claim",
            "evaluationValue": 2,
            "info": "the statement of fact is consistent with available observations/data",
            "label": "Accurate",
            "name": "accurate",
            "src": "/static/images/TagH_Accurate_2.png"
        },
        {
            "evaluationType": "claim",
            "evaluationValue": 2,
            "info": "the theory/hypothesis is consistent with available data and has not been disproven",
            "label": "Correct",
            "name": "correct",
            "src": "/static/images/TagH_Correct_2.png"
        },
        {
            "evaluationType": "claim",
            "evaluationValue": 1,
            "info": "it needs some clarification or additional information to be fully accurate",
            "label": "Mostly Accurate",
            "name": "mostly-accurate",
            "src": "/static/images/TagH_Mostly_Accurate_1.png"
        },
        {
            "evaluationType": "claim",
            "evaluationValue": 1,
            "info": "it overstates the confidence scientists actually have in the theory or it slightly distorts what can be predicted based on the theory",
            "label": "Mostly Correct",
            "name": "mostly-correct",
            "src": "/static/images/TagH_Mostly_Correct_1.png"
        },
        {
            "evaluationType": "claim",
            "evaluationValue": 0,
            "info": "it uses ill-defined terms or lacks specifics so that one cannot unambiguously know what is meant without making additional unstated assumptions",
            "label": "Imprecise",
            "name": "imprecise",
            "src": "/static/images/TagH_Imprecise_0.png"
        },
        {
            "evaluationType": "claim",
            "evaluationValue": 0,
            "info": "it significantly overstates scientific confidence in a theory or distorts what can be predicted based on the theory",
            "label": "Correct But",
            "name": "correct-but",
            "src": "/static/images/TagH_Correct_But_0.png"
        },
        {
            "evaluationType": "claim",
            "evaluationValue": 2,
            "info": "it leaves the reader with a false or poor understanding of how things work",
            "label": "Misleading",
            "name": "misleading",
            "src": "/static/images/TagH_Misleading_-1.png"
        },
        {
            "evaluationType": "claim",
            "evaluationValue": -1,
            "info": "the reference used to support the claim is non-existent, of low scientific credibility or insufficient",
            "label": "Unsupported",
            "name": "unsupported",
            "src": "/static/images/TagH_Unsupported_-1.png"
        },
        {
            "evaluationType": "claim",
            "evaluationValue": -2,
            "info": "it makes a statement of fact in direct contradiction with available data",
            "label": "Inaccurate",
            "name": "inaccurate",
            "src": "/static/images/TagH_Inaccurate_-2.png"
        },
        {
            "evaluationType": "claim",
            "evaluationValue": -2,
            "info": "it provides an explanation or a theory whose predictions have been invalidated",
            "label": "Incorrect",
            "name": "incorrect",
            "src": "/static/images/TagH_Incorrect_-2.png"
         }
    ]
