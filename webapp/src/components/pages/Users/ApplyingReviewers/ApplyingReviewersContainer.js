import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { requestData } from 'redux-thunk-data'

import ApplyingReviewers from './ApplyingReviewers'

const mapStateToProps = state => ({
  applyingReviewers: state.data.users
})

const mapDispatchToProps = dispatch => ({
  requestGetApplyingReviewers: () => dispatch(requestData({
    apiPath: '/users'
  }))
})

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ApplyingReviewers)
