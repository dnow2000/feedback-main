import { connect } from "react-redux"
import { compose } from "redux"

import Home from './Home'

const mapStateToProps = state => {
  return { reviews: state.data.reviews }
}

export default compose(
  connect(mapStateToProps)
)(Home)
