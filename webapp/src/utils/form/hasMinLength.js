import isString  from './isString'


export default (value, min) => {
  if (!isString(value) || typeof min !== 'number') return false
  return value.length >= min
}
