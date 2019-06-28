import { connect } from 'react-redux'
import { compose } from 'redux'

import Article from './Article'
import mapStateToProps from './mapStateToProps'
import { withRequiredLogin, withRoles } from '../../hocs'

export default compose(
  withRequiredLogin,
  withRoles({ creationRoleTypes: ['editor'], modificationRoleTypes: ['editor'] }),
  connect(mapStateToProps)
)(Article)
