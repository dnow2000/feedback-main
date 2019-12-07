import { connect } from 'react-redux'
import { requestData } from 'redux-thunk-data'

import ImageAddButton from './ImageAddButton'

export const mapDispatchToProps = dispatch => {
  return {
    requesPostImage: (image, handleSuccess, handleFail) => {

      const body = new FormData()
      body.append('thumb', image)
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

export default connect(mapDispatchToProps)(ImageAddButton)
