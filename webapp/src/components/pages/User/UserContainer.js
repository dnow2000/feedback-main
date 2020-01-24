import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectEntityByKeyAndId } from 'redux-thunk-data'
import withQueryRouter from 'with-query-router'

import withRequiredLogin from 'components/hocs/withRequiredLogin'
import withRoles from 'components/hocs/withRoles'

import User from './User'

const mapStateToProps = (state, ownProps) =>  {
  const { match: { params: { userId } } } = ownProps
  return {
    user: selectEntityByKeyAndId(state, 'users', userId)
  }
}

export default compose(
  withQueryRouter(),
  withRequiredLogin,
  withRoles({ creationRoleTypes: ['master'], modificationRoleTypes: ['master'] }),
  connect(mapStateToProps)
)(User)
