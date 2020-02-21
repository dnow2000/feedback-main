import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { deleteData } from 'redux-thunk-data'

import Days from './Days'
import Themes from './Themes'
import KeywordsBar from './KeywordsBar'
import { getItemsActivityTagFromConfig } from '../utils'

const Controls = ({
  config,
  dispatch,
  history: { push },
  query: {
    getSearchFromUpdate,
    params: { days, keywords, theme }
  }
}) => {
  const handleChange =  useCallback((key, value) => {
    const isEmptyValue =
      typeof value === 'undefined' ||
      value === ''
    const nextValue = isEmptyValue
      ? null
      : value
    push(getSearchFromUpdate({ [key]: nextValue }))
    dispatch(deleteData(null, { tags: [getItemsActivityTagFromConfig(config)] }))
  }, [config, dispatch, getSearchFromUpdate, push])


  return (
    <div className="controls">
      <Themes
        onChange={handleChange}
        selectedTheme={theme}
      />
      <div className="right">
        <Days
          onChange={handleChange}
          selectedDays={days}
        />
        <KeywordsBar
          onChange={handleChange}
          selectedKeywords={keywords}
        />
      </div>
    </div>
  )
}


Controls.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default Controls
