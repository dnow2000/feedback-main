import { requestData } from 'redux-saga-data'

const mapDispatchToProps = (dispatch, ownProps) => {
  const { user } = ownProps
  const { id: userId } = user
  return {
    requestGetPublications: () => dispatch(requestData({
      apiPath: `userArticles/${userId}`
    }))
  }
}

export default mapDispatchToProps
