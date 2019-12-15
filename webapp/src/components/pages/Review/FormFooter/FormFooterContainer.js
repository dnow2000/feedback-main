import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import withForm from 'with-react-form'

import FormFooter from './FormFooter'

export default compose(
  withRouter,
  withForm
)(FormFooter)
