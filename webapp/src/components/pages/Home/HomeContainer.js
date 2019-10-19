import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import Home from './Home'
import { withRedirectWhenLoggedIn } from '../../hocs'

export default compose(
  withRouter,
  withRedirectWhenLoggedIn,
  connect()
)(Home)
