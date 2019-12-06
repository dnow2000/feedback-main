import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'react-final-form'

import Checkboxes from './Checkboxes'
import { FieldError } from '../../layout'

export const CheckboxesField = ({
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
          className || "field checkboxes-field",
          { readonly: readOnly })
        }
      >
        <div className="field-control">
          <div className="field-inner">
            <Checkboxes
              {...inputProps}
              className="field-checkboxes"
              disabled={disabled}
              input={input}
              options={options}
              readOnly={readOnly}
              {...input}
            />
          </div>
        </div>
        <FieldError meta={meta} />
      </div>
    )
  }
  />
)

CheckboxesField.defaultProps = {
  className: null,
  disabled: false,
  name: null,
  options: null,
  readOnly: false
}

CheckboxesField.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  options: PropTypes.array,
  readOnly: PropTypes.bool
}

export default CheckboxesField
