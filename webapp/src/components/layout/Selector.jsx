import classnames from 'classnames'
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
    [{
      className: 'placeholder',
      label: placeholder || searchKey,
      value: ''
    }].concat(options), [options, placeholder, searchKey])

  const handleOnChange = useCallback(event =>
    onChange(searchKey, event.target.value)
  , [onChange, searchKey])


  if (!options) return null


  return (
    <select
      className={classnames(`selector selector-${searchKey}`, {
        'empty': !selectedValue
      })}
      defaultValue={selectedValue}
      onChange={handleOnChange}
    >
      {optionsWithPlaceholder.map(({ className, label, value }) => (
        <option
          className={className}
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
  options: null,
  placeholder: null,
  selectedValue: null
}

_.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  })),
  placeholder: PropTypes.string,
  searchKey: PropTypes.string.isRequired,
  selectedValue: PropTypes.string
}

export default _
