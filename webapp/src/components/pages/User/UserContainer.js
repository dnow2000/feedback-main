import { connect } from 'react-redux'
import { compose } from 'redux'
import withQueryRouter from 'with-query-router'

import User from './User'
import withRequiredLogin from '../../hocs/withRequiredLogin'
import withRoles from '../../hocs/withRoles'
import selectUserById from '../../../selectors/selectUserById'

const mapStateToProps = (state, ownProps) =>  {
  const { match: { params: { userId } } } = ownProps
  return {
    user: selectUserById(state, userId)
  }
}

export default compose(
  withQueryRouter(),
  withRequiredLogin,
  withRoles({ creationRoleTypes: ['master'], modificationRoleTypes: ['master'] }),
  connect(mapStateToProps)
)(User)
