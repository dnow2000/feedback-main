import React, { useCallback } from 'react'

import { trendingMaxDates } from './utils'

const Dates = ({ onChange }) => {

  const handleOnChange = useCallback(event => {
    onChange('days', event.target.value)
  })

  return (
    <select onChange={handleOnChange}>
      {trendingMaxDates.map(({ label, value }) => (
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

export default Dates
