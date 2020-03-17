const initialState = {}

const DELETE_REQUEST = 'DELETE_REQUEST'


const arrayErrorsToErrorsByName = errors =>
  Object.values(errors).reduce((acc, error) =>
    ({ ...acc, ...error }), {})

const parseHeaders = headers => headers && ({
  hasMore: headers['has-more'] === "False"
    ? false
    : true,
  totalDataCount: headers['total-data-count']
    ? parseInt(headers['total-data-count'], 10)
    : null
})


export default (state = initialState, action) => {
  const { config={} } = action || {}
  const key = config.activityTag || config.apiPath

  if (/FAIL_DATA_(DELETE|GET|POST|PUT|PATCH)_(.*)/.test(action.type)) {
    const nextState = {
      [key]: {
        ...state[key],
        date: new Date().toISOString(),
        errors: arrayErrorsToErrorsByName(action.payload.errors),
        headers: parseHeaders(action.payload.headers),
        isError: true,
        isPending: false,
        isSuccess: false,
      }
    }
    return { ...state, ...nextState }
  }

  if (/REQUEST_DATA_(DELETE|GET|POST|PUT|PATCH)_(.*)/.test(action.type)) {
    const nextState = {
      [key]: {
        ...state[key],
        date: new Date().toISOString(),
        errors: null,
        isError: false,
        isPending: true,
        isSuccess: false
      }
    }
    return { ...state, ...nextState }
  }

  if (/SUCCESS_DATA_(DELETE|GET|POST|PUT|PATCH)_(.*)/.test(action.type)) {
    const nextState = {
      [key]: {
        ...state[key],
        date: new Date().toISOString(),
        errors: null,
        headers: parseHeaders(action.payload.headers),
        isError: false,
        isPending: false,
        isSuccess: true
      }
    }
    return Object.assign({}, state, nextState)
  }

  if (action.type === DELETE_REQUEST) {
    const nextState = { [action.key]: undefined }
    return { ...state, ...nextState }
  }

  return state
}


export const deleteRequest = key => ({
  key,
  type: DELETE_REQUEST
})
