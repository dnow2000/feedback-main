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

  onCheckboxClick = value => () => {
    const { onChange } = this.props
    const { values } = this.state

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
      <div className={classnames('flex-columns flex-wrap', className)}>
        {options && options.map(({ label, title, value }) => {
          const checked = values.includes(value)
          return (
            <span className="" key={value}>
              <button
                className={classnames("button", {
                  checked,
                  "not-checked": !checked
                })}
                disabled={disabled || readOnly}
                onClick={this.onCheckboxClick(value)}
                readOnly={readOnly}
                title={title}
                type="button"
              >
                {label}
              </button>
            </span>
          )
        })}
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
