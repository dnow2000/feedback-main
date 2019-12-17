import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import withForm from 'with-react-form'

import FormFooter from './FormFooter'

const mapStateToProps = state => ({
  isPending: (state.requests['/reviews'] || {}).isPending
})

export default compose(
  withRouter,
  withForm,
  connect(mapStateToProps)
)(FormFooter)
