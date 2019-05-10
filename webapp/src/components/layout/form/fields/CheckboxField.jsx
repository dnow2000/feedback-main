/* eslint
  react/jsx-one-expression-per-line: 0 */
import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import { FieldError } from '../layout'

export const CheckboxField = ({
  autoComplete,
  className,
  disabled,
  id,
  label,
  name,
  placeholder,
  readOnly,
  renderInner,
  renderValue,
  required,
  type,
  validate,
}) => (
  <Field
    name={name}
    validate={validate}
    render={({ input, meta }) => (
      <div
        className={classnames("field checkbox-field",
          className, { readonly: readOnly })}
        id={id}
      >
        <label htmlFor={name} className={classnames("field-label", { empty: !label })}>
          {label && (
            <span>
              <span>{label}</span>
              {required && !readOnly && <span className="field-asterisk">*</span>}
            </span>
          )}
        </label>
        <div className="field-control">
          <div className="field-value flex-columns items-center">
            <div className="field-inner flex-columns items-center">
              <input
                {...input}
                autoComplete={autoComplete ? 'on' : 'off'}
                className={`field-input field-${type}`}
                disabled={disabled || readOnly}
                placeholder={readOnly ? '' : placeholder}
                readOnly={readOnly}
                required={!!required} // cast to boolean
                type={type}
              />
              {renderInner()}
            </div>
            {renderValue()}
          </div>
          <FieldError meta={meta} />
        </div>
      </div>
    )}
  />
)

CheckboxField.defaultProps = {
  autoComplete: false,
  className: '',
  disabled: false,
  id: null,
  label: '',
  placeholder: 'Please enter a value',
  readOnly: false,
  renderInner: () => null,
  renderValue: () => null,
  required: false,
  type: 'checkbox',
  validate: null,
}

CheckboxField.propTypes = {
  autoComplete: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  renderInner: PropTypes.func,
  renderValue: PropTypes.func,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  type: PropTypes.string,
  validate: PropTypes.func,
}

export default CheckboxField
