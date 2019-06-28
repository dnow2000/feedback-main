import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import PublicationItem from './PublicationItem'

export default compose(
  withRouter,
  connect()
)(PublicationItem)
