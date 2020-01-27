import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { selectEntityByKeyAndId } from 'redux-thunk-data'
import { selectCurrentUser } from 'with-react-redux-login'

import selectTagsByUserId from 'selectors/selectTagsByUserId'

import VerdictUserItem from './VerdictUserItem'
import selectReviewByArticleIdAndUserId from './selectors/selectReviewByArticleIdAndUserId'

const mapStateToProps = (state, ownProps) =>  {
  const { match: { params: { verdictId } } } = ownProps
  const { id: userId } = ownProps.user

  const verdict = selectEntityByKeyAndId(state, 'verdicts', verdictId)
  const { articleId } = verdict

  const review = selectReviewByArticleIdAndUserId(state, articleId, userId)
  const { evaluationId } = (review || {})

  return {
    currentUser: selectCurrentUser(state),
    evaluation: selectEntityByKeyAndId(state, 'evaluations', evaluationId),
    review,
    tags: selectTagsByUserId(state, userId),
    verdict
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(VerdictUserItem)
