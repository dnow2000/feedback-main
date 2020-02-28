/* eslint
  react/jsx-one-expression-per-line: 0 */
import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import Textarea from 'react-autosize-textarea'
import { Field } from 'react-final-form'

import {
  composeValidators,
  getRequiredValidate
} from 'utils/form'

import FieldError from '../FieldError'


const TextareaField = ({
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
}) => (
  <Field
    name={name}
    validate={composeValidators(validate, getRequiredValidate(required))}
    render={({ input, meta }) => {

      const valueLength = input.value.length
      const value =
        valueLength > maxLength - 1
          ? input.value.slice(0, maxLength - 1)
          : input.value

      return (
        <div className={classnames("textarea-field", { readonly: readOnly })}>
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
