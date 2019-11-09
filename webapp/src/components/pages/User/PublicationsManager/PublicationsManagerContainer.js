import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { requestData } from 'redux-thunk-data'

import PublicationsManager from './PublicationsManager'
import selectPublicationsByUserId from './selectors/selectPublicationsByUserId'

const mapStateToProps = (state, ownProps) => {
  const { user } = ownProps
  const { id: userId } = user || {}
  return {
    publications: selectPublicationsByUserId(state, userId)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { user } = ownProps
  const { id: userId } = user || {}
  return {
    requestGetPublications: () => user && dispatch(requestData({
      apiPath: `userArticles/${userId}`
    }))
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(PublicationsManager)
