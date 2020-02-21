import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import withFormidable from 'with-react-formidable'

import FormFooter from './FormFooter'

const mapStateToProps = state => ({
  isPending: (state.requests['/reviews'] || {}).isPending
})

export default compose(
  withRouter,
  withFormidable,
  connect(mapStateToProps)
)(FormFooter)
