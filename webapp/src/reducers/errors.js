import {
  getBackendFieldErrorId,
  getBackendGlobalError,
  parseSubmitErrors
} from 'utils/errors'


const initialState = {}


export default (state = initialState, action) => {
  const { config={} } = action || {}
  const key = config.activityTag || config.apiPath

  if (/FAIL_DATA_(DELETE|GET|POST|PUT|PATCH)_(.*)/.test(action.type)) {
    console.log("AVANT", action.payload.errors)
    const errors = parseSubmitErrors(action.payload.errors)
    console.log("APRES", errors)
    const globalError = getBackendGlobalError(errors)
    const fieldErrorId = getBackendFieldErrorId(errors)
    return { ...state, [key]: { errors, fieldErrorId, globalError } }
  } else if (/SUCCESS_DATA_(DELETE|GET|POST|PUT|PATCH)_(.*)/.test(action.type)) {
    return { ...state, [key]: {} }
  }

  return state
}
