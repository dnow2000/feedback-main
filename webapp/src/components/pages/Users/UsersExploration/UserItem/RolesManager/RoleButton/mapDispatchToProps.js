import { requestData } from 'redux-saga-data'

const mapDispatchToProps = (dispatch, ownProps) => {
  const { user } = ownProps
  return {
    toggleRole: () => {
      const apiPath = "/roles"
      // dispatch(requestData(apiPath))
    }
  }
}

export default mapDispatchToProps
