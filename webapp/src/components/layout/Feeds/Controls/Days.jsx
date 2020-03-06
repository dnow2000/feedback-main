import PropTypes from 'prop-types'
import React, { useCallback } from 'react'


export const trendingMaxDays = [
  { label: 'Today', value: '1' },
  { label: '2 days', value: '2' },
  { label: '1 week', value: '7' },
  { label: '1 month', value: '30' }
]


const Days = ({
  selectedDays='1',
  onChange
}) => {

  const handleOnChange = useCallback(event =>
    onChange('days', event.target.value)
  , [onChange])

  return (
    <select
      className="dates"
      defaultValue={selectedDays}
      onChange={handleOnChange}
    >
      {trendingMaxDays.map(({ label, value }) => (
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

Days.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedDays: PropTypes.string
}

export default Days
