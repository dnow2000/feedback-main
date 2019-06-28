import { connect } from 'react-redux'
import { compose } from 'redux'

import { withRequiredLogin, withRoles } from '../../hocs'

import User from './User'
import mapStateToProps from './mapStateToProps'

export default compose(
  withRequiredLogin,
  withRoles({ creationRoleTypes: ['master'], modificationRoleTypes: ['master'] }),
  connect(mapStateToProps)
)(User)
