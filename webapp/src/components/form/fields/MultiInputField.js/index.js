import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Field } from 'react-final-form'

import Radios from './Radios'
import { FieldError } from '../../layout'

const defaultValues = []

export class MultiInputsField extends Component {
  onChange = input => nextRadiosState => {
    if (input && input.onChange) {
      input.onChange(nextRadiosState)
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
              className || "field radios-field",
              { readonly: readOnly })
            }
          >
            <div className="field-control">
              <div className="field-inner">
                <Radios
                  className="field-radios"
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

MultiInputsField.defaultProps = {
  className: null,
  disabled: false,
  name: null,
  options: null,
  readOnly: false
}

MultiInputsField.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  options: PropTypes.array,
  readOnly: PropTypes.bool
}

export default MultiInputsField
