import { connect } from 'react-redux'
import { compose } from 'redux'
import withQueryRouter from 'with-query-router'
import { selectCurrentUser } from 'with-react-redux-login'

import selectUsers from 'selectors/selectUsers'

import UsersExploration from './UsersExploration'

const mapStateToProps = state => {
  return {
    currentUser: selectCurrentUser(state),
    users: selectUsers(state),
  }
}

export default compose(
  withQueryRouter(),
  connect(mapStateToProps)
)(UsersExploration)
