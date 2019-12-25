import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import withQuery from 'with-react-query'

import KeywordsBar from './KeywordsBar'

export default compose(
  withRouter,
  withQuery(),
  connect()
)(KeywordsBar)
