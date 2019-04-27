import { connect } from 'react-redux'

import Hamburger from './Hamburger'
import mapStateToProps from './mapStateToProps'

export default connect(mapStateToProps)(Hamburger)
