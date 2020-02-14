import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { selectEntityByKeyAndId, selectEntitiesByKeyAndJoin } from 'redux-thunk-data'
import { compose } from 'redux'

import ReviewersManager from './ReviewersManager'
import selectUsersByVerdictId from 'selectors/selectUsersByVerdictId'

function mapStateToProps (state, ownProps) {
  const { match: { params: { verdictId } } } = ownProps
  const verdictUsers = selectUsersByVerdictId(state, verdictId)
  const verdict = selectEntityByKeyAndId(state, 'verdicts', verdictId)
  const { articleId } = verdict || {}
  const reviews = selectEntitiesByKeyAndJoin(state, 'reviews', { key: 'articleId', value: articleId })
  return {
    verdictUsers,
    reviews: reviews
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ReviewersManager)
