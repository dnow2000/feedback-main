import isEmpty from './isEmpty'

const createValidateRequiredField = error => value => {
  if (value && !isEmpty(value)) return undefined
  return error
}

const validateRequiredField = createValidateRequiredField(
  'This field is obligatory'
)

export default required => {
  const requiredIsAFunction = required && typeof required === 'function'
  const defaultRequiredValidate =
    (required && validateRequiredField) || undefined
  const requiredValidate = requiredIsAFunction
    ? required
    : defaultRequiredValidate
  return requiredValidate
}
