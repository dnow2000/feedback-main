import { connect } from 'react-redux'

import Hamburger from './Hamburger'

function mapStateToProps (state) {
  return {
    isNavigationActive: state.navigation.isActive
  }
}

export default connect(mapStateToProps)(Hamburger)
