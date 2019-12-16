const initialState = {}

const DELETE_REQUEST = 'DELETE_REQUEST'

const requests = (state = initialState, action) => {
  const { config={} } = action || {}
  const key = config.activityTag || config.apiPath

  if (/FAIL_DATA_(DELETE|GET|POST|PUT|PATCH)_(.*)/.test(action.type)) {
    const nextState = {
      [key]: {
        isError: true,
        isPending: false,
        isSuccess: false,
      }
    }
    return Object.assign({}, state, nextState)
  }

  if (/REQUEST_DATA_(DELETE|GET|POST|PUT|PATCH)_(.*)/.test(action.type)) {
    const nextState = {
      [key]: {
        isError: false,
        isPending: true,
        isSuccess: false,
      }
    }
    return Object.assign({}, state, nextState)
  }

  if (/SUCCESS_DATA_(DELETE|GET|POST|PUT|PATCH)_(.*)/.test(action.type)) {
    const nextState = {
      [key]: {
        isError: false,
        isPending: false,
        isSuccess: true
      }
    }
    return Object.assign({}, state, nextState)
  }

  if (action.type === DELETE_REQUEST) {
    const nextState = { [action.key]: undefined }
    return Object.assign({}, state, nextState)
  }

  return state
}

export const deleteRequest = key => ({
  key,
  type: DELETE_REQUEST
})

export default requests
