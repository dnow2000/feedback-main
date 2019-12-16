const initialState = {}


const errors = (state = initialState, action) => {
  const { config={} } = action || {}
  const key = config.activityTag || config.apiPath

  if (/FAIL_DATA_(DELETE|GET|POST|PUT|PATCH)_(.*)/.test(action.type)) {
    const nextState = { [key]: action.payload.errors }
    return Object.assign({}, state, nextState)
  }

  return state
}

export default errors
