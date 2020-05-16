from sqlalchemy_api_handler import ApiHandler, logger

from models.evaluation import Evaluation


def create_evaluations():
    logger.info('create_evaluations')

    evaluations = []

    evaluations.append(Evaluation(
        info='It describes an observation in a way that is consistent with available data and does not leave out any relevant element of context or it is a theory that has been well tested in scientific studies and generates expected observations that are confirmed by actual observations',
        label='Very High',
        type='claim',
        value=2
    ))

    evaluations.append(Evaluation(
        info='It needs some clarification or additional information to be fully accurate or it presents a theory that is well tested in scientific studies, but its formulation in the claim might overstate the confidence scientists actually have in the theory or slightly distort what can be predicted based on the theory',
        label='High',
        type='claim',
        value=1
    ))

    evaluations.append(Evaluation(
        info='It leaves out important information or is made out of context',
        label='Neutral',
        type='claim',
        value=0
    ))

    evaluations.append(Evaluation(
        info='It is made without backing from an adequate reference or the available evidence does not support the statement or it contains an element of truth but leaves the reader with a false understanding of reality',
        label='Low',
        type='claim',
        value=-1
    ))

    evaluations.append(Evaluation(
        info='It is clearly wrong',
        label='Very Low',
        type='claim',
        value=-2
    ))

    evaluations.append(Evaluation(
        info='No inaccuracies, fairly represents the state of scientific knowledge, well argued and documented, references are provided for key elements. The content provides insights to the reader about scientific mechanisms and implications, as well as limitations and important unknowns surrounding the evidence.',
        label='Very High',
        type='content',
        value=2
    ))

    evaluations.append(Evaluation(
        info='The content does not contain scientific inaccuracies and its conclusion follows from the evidence provided. While more detail would have been useful, readers are still accurately informed of the science.',
        label='High',
        type='content',
        value=1
    ))

    evaluations.append(Evaluation(
        info='No significant errors, but not enough insight either to inform the reader.',
        type='content',
        label='Neutral',
        value=0
    ))

    evaluations.append(Evaluation(
        info='The content contains significant scientific inaccuracies or misleading statements.',
        label='Low',
        type='content',
        value=-1
    ))

    evaluations.append(Evaluation(
        info='The content contains major scientific inaccuracies for key facts supporting argumentation, and/or omits important information, and/or presents logical flaws in using information to reach conclusions.',
        label='Very Low',
        type='content',
        value=-2
    ))

    evaluations.append(Evaluation(
        info='The content does not build on scientifically verifiable information (e.g. it is mostly about policy, politics or opinions).',
        label='Not applicable',
        type='content',
        value=None
    ))

    ApiHandler.save(*evaluations)

    logger.info('created {} evaluations'.format(len(evaluations)))

    return evaluations
