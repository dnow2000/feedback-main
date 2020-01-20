import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import selectVerdictById from 'selectors/selectVerdictById'
import selectReviewsByArticleId from 'selectors/selectReviewsByArticleId'

import ReviewersManager from './ReviewersManager'
import selectUsersByVerdictId from '../../../../selectors/selectUsersByVerdictId'

function mapStateToProps (state, ownProps) {
  const { match: { params: { verdictId } } } = ownProps
  const verdictUsers = selectUsersByVerdictId(state, verdictId)
  const verdict = selectVerdictById(state, verdictId)
  const { articleId } = verdict || {}
  const reviews = selectReviewsByArticleId(state, articleId)
  return {
    verdictUsers,
    reviews: reviews
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ReviewersManager)
