import { connect } from 'react-redux'
import { compose } from 'redux'

import Signup from './Signup'
import { withNotRequiredLogin } from '../../hocs'

export default compose(
  withNotRequiredLogin,
  connect()
)(Signup)
