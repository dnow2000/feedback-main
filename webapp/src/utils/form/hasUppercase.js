import isString from './isString'


export default value => {
  if (!isString(value) || !value.trim().length) return false
  return /[A-Z]/.test(value)
}
