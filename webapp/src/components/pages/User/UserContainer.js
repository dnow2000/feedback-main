import { connect } from 'react-redux'
import { compose } from 'redux'

import User from './User'
import { withRequiredLogin, withRoles } from '../../hocs'
import { selectUserById } from '../../../selectors'

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
