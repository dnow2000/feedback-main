import PropTypes from 'prop-types'
import React, { useCallback } from 'react'

import { trendingMaxDays } from './utils'

const Days = ({
  selectedDays=1,
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
  selectedDays: PropTypes.number
}

export default Days
