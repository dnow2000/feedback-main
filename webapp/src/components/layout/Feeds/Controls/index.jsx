import { getStateKeyFromConfig } from 'fetch-normalize-data'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { deleteData } from 'redux-thunk-data'
import { useQuery } from 'with-react-query'

import Days from './Days'
import Themes from './Themes'
import KeywordsBar from './KeywordsBar'


export const getItemsActivityTagFromConfig = config =>
  `/${getStateKeyFromConfig(config)}-items`


export default ({ config }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const {
    getSearchFromUpdate,
    params: { days, keywords, theme }
  } = useQuery(location.search)

  const handleChange =  useCallback((key, value) => {
    const isEmptyValue =
      typeof value === 'undefined' ||
      value === ''
    const nextValue = isEmptyValue
      ? null
      : value
    history.push(getSearchFromUpdate({ [key]: nextValue }))
    dispatch(deleteData(null, { tags: [getItemsActivityTagFromConfig(config)] }))
  }, [config, dispatch, getSearchFromUpdate, history])


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
