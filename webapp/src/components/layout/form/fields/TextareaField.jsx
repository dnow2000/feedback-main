/* eslint
  react/jsx-one-expression-per-line: 0 */
import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import Textarea from 'react-autosize-textarea'
import { Field } from 'react-final-form'

import {
  composeValidators,
  getRequiredValidate
} from 'utils/form'

import FieldError from '../FieldError'


const _ = ({
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
  const renderField = useCallback(({ input, meta }) => {

    const valueLength = input.value.length
    const value =
      valueLength > maxLength - 1
        ? input.value.slice(0, maxLength - 1)
        : input.value

    return (
      <div className={classnames("textarea-field", { readonly: readOnly })}>
        <label
          className={classnames("field-label", { "empty": !label })}
          htmlFor={name}
        >
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
          <div className="field-value">
            <span className="field-inner">
              <Textarea
                {...input}
                autoComplete={autoComplete ? 'on' : 'off'}
                className="field-textarea"
                disabled={disabled || readOnly}
                id={name}
                placeholder={readOnly ? '' : placeholder}
                readOnly={readOnly}
                required={!!required} // cast to boolean
                rows={rows}
                value={value}
              />
            </span>
          </div>
        </div>
        <FieldError meta={meta} />
      </div>
    )
  }, [autoComplete, disabled, label, maxLength, name, placeholder, readOnly, required, rows])

  return (
    <Field
      name={name}
      render={renderField}
      validate={composeValidators(validate, getRequiredValidate(required))}
    />
  )
}

_.defaultProps = {
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

_.propTypes = {
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

export default _
