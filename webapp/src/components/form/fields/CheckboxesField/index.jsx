import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Field } from 'react-final-form'

import Checkboxes from './Checkboxes'
import { FieldError } from '../../layout'

const defaultValues = []

export class CheckboxesField extends Component {
  onChange = input => nextCheckboxesState => {
    if (input && input.onChange) {
      input.onChange(nextCheckboxesState)
    }
  }

  render () {
    const {
      className,
      disabled,
      name,
      options,
      readOnly
    } = this.props
    return (
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
                  className="field-checkboxes"
                  defaultValues={input.value || defaultValues}
                  disabled={disabled}
                  input={input}
                  onChange={this.onChange(input)}
                  options={options}
                  readOnly={readOnly}
                />
              </div>
            </div>
            <FieldError meta={meta} />
          </div>
        )
      }
      />
    )
  }
}

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
