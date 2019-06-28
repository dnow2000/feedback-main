import { connect } from 'react-redux'
import { compose } from 'redux'

import Trendings from './Trendings'
import mapStateToProps from './mapStateToProps'
import { withRequiredLogin, withRoles } from '../../hocs'

export default compose(
  withRequiredLogin,
  withRoles({ accessRoleTypes: ['editor'] }),
  connect(mapStateToProps)
)(Trendings)
