import { connect } from "react-redux"
import { compose } from "redux"

import Home from './Home'
import mapStateToProps from './mapStateToProps'

export default compose(
  connect(mapStateToProps)
)(Home)
