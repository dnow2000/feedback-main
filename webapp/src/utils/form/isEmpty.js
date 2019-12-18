import isString from './isString'

export default value => {
  if (!isString(value)) return false
  return value.trim().length === 0
}
