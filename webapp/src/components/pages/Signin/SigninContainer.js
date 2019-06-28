import { connect } from 'react-redux'
import { compose } from 'redux'

import { withNotRequiredLogin } from '../../hocs'
import Signin from './Signin'

export default compose(
  withNotRequiredLogin,
  connect()
)(Signin)
