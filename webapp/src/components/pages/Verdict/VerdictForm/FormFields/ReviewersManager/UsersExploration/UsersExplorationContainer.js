import { connect } from 'react-redux'
import { compose } from 'redux'
import withQueryRouter from 'with-query-router'
import { selectCurrentUser } from 'with-react-redux-login'

import UsersExploration from './UsersExploration'
import selectEligibleVerdictUsersByVerdictId from './selectors/selectEligibleVerdictUsersByVerdictId'

const mapStateToProps = (state, ownProps) =>  {
  const { match: { params: { verdictId } } } = ownProps
  return {
    currentUser: selectCurrentUser(state),
    users: selectEligibleVerdictUsersByVerdictId(state, verdictId),
  }
}

export default compose(
  withQueryRouter(),
  connect(mapStateToProps)
)(UsersExploration)
