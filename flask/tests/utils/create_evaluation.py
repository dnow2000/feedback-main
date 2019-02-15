from models.evaluation import Evaluation

def create_evaluation(evaluation_type, info, label, value):
    evaluation = Evaluation()
    evaluation.type = evaluation_type
    evaluation.info = info
    evaluation.label = label
    evaluation.value =  value

    return evaluation
