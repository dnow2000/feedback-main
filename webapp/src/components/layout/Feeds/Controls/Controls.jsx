import React, { useCallback } from 'react'

import Dates from './Dates'
import Themes from './Themes'
import KeywordsBarContainer from './KeywordsBar/KeywordsBarContainer'

const Controls = ({
  dispatch,
  history: { push },
  query: { getParams: getQueryParams, getSearchFromUpdate }
}) => {
  const { days, theme } = getQueryParams()


  const handleChange =  useCallback((key, value) => () => {
    let nextValue = value
    if (value === 1) {
      if (!days) {
        return
      }
      nextValue = null
    }
    push(getSearchFromUpdate({ [key]: nextValue }))
  }, [])


  return (
    <div className="controls">
      <Themes
        onChange={handleChange}
        selectedTheme={theme}
      />
      <div className="right">
        <Dates
          onChange={handleChange}
          selectedDate={days}
        />
        <KeywordsBarContainer />
      </div>
    </div>
  )
}

export default Controls
