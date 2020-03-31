import PropTypes from 'prop-types'
import React, { useCallback } from 'react'


export const options = [
  { label: 'Article', value: 'article' },
  { label: 'Claim', value: 'claim' },
]


const Types = ({
  selectedType='article',
  onChange
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

Types.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedType: PropTypes.string
}

export default Types
