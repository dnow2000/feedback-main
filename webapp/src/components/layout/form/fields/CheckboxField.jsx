/* eslint react/jsx-one-expression-per-line: 0 */
import classnames from 'classnames'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import {
  composeValidators,
  getRequiredValidate
} from 'utils/form'


import FieldError from '../FieldError'


class CheckboxField extends PureComponent {

  renderField = ({ input, meta }) => {
    const {
      autoComplete,
      className,
      disabled,
      id,
      label,
      text,
      name,
      placeholder,
      readOnly,
      renderInner,
      renderValue,
      required,
      type,
      validate,
      ...inputProps
    } = this.props
    return (
      <div
        className={classnames("checkbox-field",
          className, { readonly: readOnly })}
        id={id}
      >
        <div className="field-control">
          <input
            {...inputProps}
            {...input}
            name={name}
            required={!!required}
            type={type}
          />
          <span>
            {text}
          </span>
          <FieldError meta={meta} />
        </div>
      </div>
    )
  }

  render() {
    const {
      name,
      required,
      type,
      validate
    } = this.props
    return (
      <Field
        name={name}
        type={type}
        render={this.renderField}
        validate={composeValidators(validate, getRequiredValidate(required))}
      />
    )
  }
}

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
  text: null,
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
  text: PropTypes.string,
  type: PropTypes.string,
  validate: PropTypes.func,
}

export default CheckboxField
