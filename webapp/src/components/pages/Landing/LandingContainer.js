import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { requestData } from 'redux-thunk-data'

import withRedirectWhenLoggedIn from 'components/hocs/withRedirectWhenLoggedIn'

import Landing from './Landing'

const mapStateToProps = state => ({
  verdicts: state.data.verdicts
})

const mapDispatchToProps = dispatch => ({
  requestGetVerdicts: () => dispatch(requestData({
    apiPath: "/verdicts",
    normalizer: { article: "articles" }
  }))
})

export default compose(
  withRouter,
  withRedirectWhenLoggedIn,
  connect(mapStateToProps, mapDispatchToProps)
)(Landing)
