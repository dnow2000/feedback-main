from models.conclusion import Conclusion

def create_conclusion(evaluation, info, label, name):
    conclusion = Conclusion()
    "evaluationType": "claim",
    "evaluationValue": 2,
    "info": "the statement of fact is consistent with available observations/data",
    "label": "Accurate",
    "name": "accurate",
    "src": "/static/images/TagH_Accurate_2.png"
