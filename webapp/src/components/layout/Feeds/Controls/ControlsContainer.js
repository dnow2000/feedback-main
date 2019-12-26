import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import withQuery from 'with-react-query'

import Controls from './Controls'

export default compose(
  withRouter,
  withQuery()
)(Controls)
