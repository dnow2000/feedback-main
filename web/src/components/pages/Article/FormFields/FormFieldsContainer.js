import { connect } from 'react-redux'
import { compose } from 'redux'
import withQueryRouter from 'with-query-router'

import FormFields from './FormFields'

export default compose(
  withQueryRouter(),
  connect()
)(FormFields)
