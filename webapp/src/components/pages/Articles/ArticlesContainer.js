import { withRouter } from 'react-router'
import { compose } from 'redux'

import withRequiredLogin from 'components/hocs/withRequiredLogin'

import Articles from './Articles'


export default compose(
  withRouter,
  withRequiredLogin
)(Articles)
