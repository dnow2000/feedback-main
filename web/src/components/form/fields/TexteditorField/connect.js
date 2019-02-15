import { requestData } from 'pass-culture-shared'

export function mapDispatchToProps (dispatch) {
  return {
    onUploadClick: (image, handleSuccess, handleFail) => {

      const body = new FormData()

      body.append('thumb', image)

      this.setState({ isLoading: true })

      dispatch(
        requestData(
          'POST',
          'images',
          {
            body,
            handleFail,
            handleSuccess
          }
        )
      )
    }
  }
}
