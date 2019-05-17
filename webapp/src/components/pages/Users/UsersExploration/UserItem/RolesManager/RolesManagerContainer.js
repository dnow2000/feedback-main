import { connect } from 'react-redux'

import RolesManager from './RolesManager'
import mapDispatchToProps from './mapDispatchToProps'
import mapStateToProps from './mapStateToProps'

export default connect(mapStateToProps, mapDispatchToProps)(RolesManager)
