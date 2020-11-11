import PropTypes from 'prop-types'
import React, { useCallback } from 'react'


const _ = ({
  selectedType,
  onChange,
  options
}) => {

  const handleOnChange = useCallback(event =>
    onChange('type', event.target.value)
  , [onChange])

  return (
    <select
      className="types"
      defaultValue={selectedType}
      onChange={handleOnChange}
    >
      {options.map(({ label, value }) => (
        <option
          key={value}
          value={value}
        >
          {label}
        </option>
      ))}
    </select>
  )
}


_.defaultProps = {
  selectedType: null
}

_.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  })).isRequired,
  selectedType: PropTypes.string
}

export default _
