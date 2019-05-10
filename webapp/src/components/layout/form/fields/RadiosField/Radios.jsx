import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class Radios extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value || props.defaultValue
    }
  }

  componentDidUpdate (prevProps) {
    const { value } = this.props
    const hasValueChanged = prevProps.value !== value
    if (hasValueChanged) {
      this.handleSetValue(value)
    }
  }

  handleSetValue = (value, callback) => {
    this.setState({ value }, callback)
  }

  onRadioClick = event => {
    const { onChange } = this.props
    const { target: { value } } = event

    this.handleSetValue(value, () => {
      if (onChange) {
        onChange(value)
      }
    })
  }

  render () {
    const {
      className,
      disabled,
      options,
      readOnly,
      ...inputProps
    } = this.props
    const { value: stateValue } = this.state

    return (
      <div className={className}>
        {options && options.map(({ label, title, value }) => {
          const checked = stateValue === value
          return (
            <div
              className={classnames(
                `radio radio-${label.replace(/\s/g,"-")} flex-columns items-center`,
                { checked }
              )}
              key={value}
              title={title}
            >
              <input
                {...inputProps}
                checked={checked}
                className="mr8"
                defaultValue={undefined}
                disabled={disabled || readOnly}
                readOnly={readOnly}
                type="radio"
                value={value}
                onChange={this.onRadioClick}
              />
              <span>
                {label}
              </span>
            </div>
          )}
        )}
      </div>
    )
  }
}

Radios.defaultProps = {
  className: null,
  defaultValue: undefined,
  disabled: false,
  onChange: null,
  readOnly: false,
  value: null
}

Radios.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOf(PropTypes.string, PropTypes.number),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  readOnly: PropTypes.bool,
  value: PropTypes.oneOf(PropTypes.string, PropTypes.number)
}

export default Radios
