import { connect } from 'react-redux'
import { compose } from 'redux'

import Verdict from './Verdict'
import mapStateToProps from './mapStateToProps'
import { withRequiredLogin, withRoles } from '../../hocs'

export default compose(
  withRequiredLogin,
  withRoles({ creationRoleTypes: ['editor'], modificationRoleTypes: ['editor'] }),
  connect(mapStateToProps)
)(Verdict)
