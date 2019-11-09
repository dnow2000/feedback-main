import { connect } from 'react-redux'
import { compose } from 'redux'

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
  withRequiredLogin,
  withRoles({ creationRoleTypes: ['master'], modificationRoleTypes: ['master'] }),
  connect(mapStateToProps)
)(User)
