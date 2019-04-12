/* eslint
  react/jsx-one-expression-per-line: 0 */
import classnames from 'classnames'
import React from 'react'
import Textarea from 'react-autosize-textarea'
import { Field } from 'react-final-form'
import PropTypes from 'prop-types'
import { composeValidators } from 'react-final-form-utils'

import { FieldError } from '../layout'
import { createValidateRequiredField } from '../validators'
import { config } from '../utils'

const validateRequiredField = createValidateRequiredField(config.DEFAULT_REQUIRED_ERROR)

export const TextareaField = ({
  autoComplete,
  className,
  disabled,
  label,
  maxLength,
  name,
  placeholder,
  readOnly,
  required,
  rows,
  validate,
}) => {

  const requiredValidate =
    required && typeof required === 'function'
      ? required
      : (required && validateRequiredField) || undefined

  return (
    <Field
      name={name}
      validate={composeValidators(validate, requiredValidate)}
      render={({ input, meta }) => {

        const valueLength = input.value.length
        const value =
          valueLength > maxLength - 1
            ? input.value.slice(0, maxLength - 1)
            : input.value

        return (
          <div className={classnames("field textarea-field", className, { readonly: readOnly })}>
            <label htmlFor={name} className={classnames("field-label", { "empty": !label })}>
              {label && (
                <span>
                  <span>{label}</span>
                  {required && !readOnly && <span className="field-asterisk">*</span>}
                  {!readOnly && (
                    <span className="fs12">
                      {' '}
                      ({valueLength} / {maxLength}){' '}
                    </span>
                  )}
                </span>
              )}
            </label>
            <div className="field-control">
              <div className="field-value flex-columns items-center">
                <span className="field-inner">
                  <Textarea
                    {...input}
                    autoComplete={autoComplete ? 'on' : 'off'}
                    className="field-textarea"
                    disabled={disabled || readOnly}
                    id={name}
                    placeholder={readOnly ? '' : placeholder}
                    readOnly={readOnly}
                    rows={rows}
                    required={!!required} // cast to boolean
                    value={value}
                  />
                </span>
              </div>
            </div>
            <FieldError meta={meta} />
          </div>
        )
      }}
    />
  )
}

TextareaField.defaultProps = {
  autoComplete: false,
  className: '',
  disabled: false,
  label: '',
  maxLength: 1000,
  placeholder: 'Please enter a value',
  readOnly: false,
  required: false,
  rows: 5,
  validate: null,
  validating: false,
}

TextareaField.propTypes = {
  autoComplete: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  rows: PropTypes.number,
  validate: PropTypes.func,
  validating: PropTypes.bool,
}

export default TextareaField
