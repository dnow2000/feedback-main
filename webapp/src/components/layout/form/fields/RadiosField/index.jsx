import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'react-final-form'

import Radios from './Radios'
import FieldError from '../../FieldError'

export const _ = ({
  disabled,
  label,
  name,
  options,
  readOnly,
  required,
  ...inputProps
}) => (
  <Field
    name={name}
    render={({ input, meta }) => (
      <div
        className={classnames(
          "radios-field",
          { readonly: readOnly })
        }
      >
        <label
          className="field-label"
          htmlFor={name}
        >
          <span>{label}</span>
          {required && !readOnly && <span className="field-asterisk">{"*"}</span>}
        </label>
        <div className="field-control">
          <div className="field-inner">
            <Radios
              {...inputProps}
              disabled={disabled}
              options={options}
              readOnly={readOnly}
              {...input}
            />
          </div>
        </div>
        <FieldError meta={meta} />
      </div>
    )}
  />
)

_.defaultProps = {
  disabled: false,
  label: null,
  name: null,
  options: null,
  readOnly: false,
  required: false
}

_.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  readOnly: PropTypes.bool,
  required: PropTypes.bool
}

export default _
