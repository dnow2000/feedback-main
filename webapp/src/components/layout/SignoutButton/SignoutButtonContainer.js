import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import SignoutButton from './SignoutButton'

export default compose(withRouter, connect())(SignoutButton)
