import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'


const _ = ({
  searchKey,
  selectedValue,
  onChange,
  options,
  placeholder
}) => {

  const optionsWithPlaceholder = useMemo(() =>
    [{ className: 'placeholder', label: placeholder, value: '' }].concat(options), [options, placeholder])

  const handleOnChange = useCallback(event =>
    onChange(searchKey, event.target.value)
  , [onChange, searchKey])


  if (!options) return null

  return (
    <select
      className={`selector selector-${searchKey}`}
      defaultValue={selectedValue}
      onBlur={handleOnChange}
    >
      {optionsWithPlaceholder.map(({ label, value }, index) => (
        <option
          disabled={index === 0}
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
  placeholder: null,
  searchKey: 'type',
  selectedValue: null
}

_.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  })).isRequired,
  placeholder: PropTypes.string,
  searchKey: PropTypes.string,
  selectedValue: PropTypes.string
}

export default _
