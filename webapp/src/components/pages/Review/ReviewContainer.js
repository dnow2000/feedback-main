import { connect } from 'react-redux'
import { compose } from 'redux'

import { withRequiredLogin, withRoles } from '../../hocs'

import Review from './Review'
import mapStateToProps from './mapStateToProps'

export default compose(
  withRequiredLogin,
  withRoles({ creationRoleTypes: ['reviewer'], modificationRoleTypes: ['reviewer'] }),
  connect(mapStateToProps)
)(Review)
