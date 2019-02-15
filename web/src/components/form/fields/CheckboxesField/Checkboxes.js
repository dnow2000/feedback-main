import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class Checkboxes extends Component {
  constructor () {
    super()
    this.state = {
      values: []
    }
  }

  componentDidUpdate (prevProps) {
    const { defaultValues } = this.props
    if (
      (!prevProps.defaultValues || !prevProps.defaultValues.length) &&
      (defaultValues && defaultValues.length)
    ) {
      this.resetState()
    }
  }

  onCheckboxClick = event => {
    const { onChange } = this.props
    const { values } = this.state
    const { target: { value } } = event

    let nextValues = values
    if (values.includes(value)) {
      nextValues = nextValues.filter(v => v !== value)
    } else {
      nextValues = nextValues.concat([value])
    }

    this.setState(
      { values: nextValues },
      () => {
        if (onChange) {
          onChange(nextValues)
        }
      }
    )
  }

  resetState = () => {
    const { defaultValues } = this.props
    this.setState({ values: defaultValues })
  }

  render () {
    const {
      className,
      disabled,
      options,
      readOnly
    } = this.props
    const { values } = this.state

    return (
      <div className={classnames('flex-columns wrap-3', className)}>
        {options && options.map(({ label, value }) => (
          <span className="" key={value}>
            <input
              className="mr8"
              checked={values.includes(value)}
              disabled={disabled || readOnly}
              onChange={this.onCheckboxClick}
              readOnly={readOnly}
              type="checkbox"
              value={value}
            />
            {label}
          </span>
        ))}
      </div>
    )
  }
}

Checkboxes.defaultProps = {
  className: null,
  defaultValues: null,
  disabled: false,
  onChange: null,
  readOnly: false,
}

Checkboxes.propTypes = {
  className: PropTypes.string,
  defaultValues: PropTypes.array,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  readOnly: PropTypes.bool,
}

export default Checkboxes
