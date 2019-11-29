import { connect } from 'react-redux'

import Hamburger from './Hamburger'

const mapStateToProps = state => {
  return {
    isMenuActive: state.menu.isActive
  }
}

export default connect(mapStateToProps)(Hamburger)
