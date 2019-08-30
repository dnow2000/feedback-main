import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { selectCurrentUser } from 'with-react-redux-login'

import VerdictUserItem from './VerdictUserItem'
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

export default compose(
  withRouter,
  connect(mapStateToProps)
)(VerdictUserItem)
