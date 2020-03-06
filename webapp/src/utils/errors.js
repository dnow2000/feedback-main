export const getBackendFieldErrorId = errors => {
  if (!errors || errors[0]) {
    return null
  }
  const errorIds = Object.keys(errors)
  if (errorIds.length === 0) {
    return null
  }
  return errorIds[0]  // TODO @colas: find top positioned instead of random
}


export const getBackendGlobalError = errors => {
  if (!errors || !errors[0]) {
    return null
  }
  const errorIds = Object.keys(errors[0])
  if (!errorIds.includes('global')) {
    return null
  }
  return errors[0]['global']
}


export const parseSubmitErrors = errors =>
  Object.keys(errors).reduce((acc, key) => {
    const err = errors[key]
    return { ...acc, [key]: err }
  }, {})
