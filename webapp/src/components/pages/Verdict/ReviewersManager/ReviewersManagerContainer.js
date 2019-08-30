import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import ReviewersManager from './ReviewersManager'
import selectUsersByVerdictId from '../../../../selectors/selectUsersByVerdictId'

function mapStateToProps (state, ownProps) {
  const { match: { params: { verdictId } } } = ownProps
  return {
    verdictUsers: selectUsersByVerdictId(state, verdictId)
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ReviewersManager)
