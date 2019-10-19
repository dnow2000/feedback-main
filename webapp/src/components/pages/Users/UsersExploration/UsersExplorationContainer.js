import { connect } from 'react-redux'
import { compose } from 'redux'
import withQueryRouter from 'with-query-router'
import { selectCurrentUser } from 'with-react-redux-login'

import UsersExploration from './UsersExploration'
import selectUsers from '../../../../selectors/selectUsers'

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
