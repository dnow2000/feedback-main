import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'react-final-form'

import Radios from './Radios'
import FieldError from '../../FieldError'

export const RadiosField = ({
  className,
  disabled,
  name,
  options,
  readOnly,
  ...inputProps
}) => (
  <Field
    name={name}
    render={({ input, meta }) => (
      <div
        className={classnames(
          className || "field radios-field",
          { readonly: readOnly })
        }
      >
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

RadiosField.defaultProps = {
  className: null,
  disabled: false,
  name: null,
  options: null,
  readOnly: false
}

RadiosField.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  options: PropTypes.array,
  readOnly: PropTypes.bool
}

export default RadiosField
