import { selectCurrentUser } from 'with-react-login'

import {
  selectEvaluationById,
  selectReviewByArticleIdAndUserId,
  selectTagsByUserId,
  selectVerdictById
} from '../../../../selectors'

function mapStateToProps (state, ownProps) {
  const { match: { params: { verdictId } } } = ownProps
  const { id: userId } = ownProps.user

  const verdict = selectVerdictById(state, verdictId)
  const { articleId } = verdict

  const review = selectReviewByArticleIdAndUserId(state, articleId, userId)
  const { evaluationId } = (review || {})

  return {
    currentUser: selectCurrentUser(state),
    evaluation: selectEvaluationById(state, evaluationId),
    review,
    tags: selectTagsByUserId(state, userId),
    verdict
  }
}

export default mapStateToProps
