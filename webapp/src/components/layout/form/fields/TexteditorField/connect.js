import { requestData } from 'redux-thunk-data'

export const mapDispatchToProps = dispatch => {
  return {
    onUploadClick: (image, handleSuccess, handleFail) => {

      const body = new FormData()

      body.append('thumb', image)

      this.setState({ isLoading: true })

      dispatch(
        requestData({
          apiPath: '/images',
          body,
          handleFail,
          handleSuccess,
          method: 'POST'
        })
      )
    }
  }
}
