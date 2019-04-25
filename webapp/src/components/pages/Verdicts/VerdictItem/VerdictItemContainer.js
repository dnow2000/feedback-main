import { connect } from 'react-redux'

import VerdictItem from './VerdictItem'
import mapStateToProps from './mapStateToProps'

export default connect(mapStateToProps)(VerdictItem)
