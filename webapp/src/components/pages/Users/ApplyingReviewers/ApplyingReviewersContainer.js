import { connect } from 'react-redux'
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplyingReviewers)
