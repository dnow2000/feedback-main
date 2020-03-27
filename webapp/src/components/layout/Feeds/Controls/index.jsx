import { getStateKeyFromConfig } from 'fetch-normalize-data'
import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { deleteData } from 'redux-thunk-data'
import { useQuery } from 'with-react-query'

import Days from './Days'
import KeywordsBar from './KeywordsBar'
import Themes from './Themes'
import Types from './Types'


export const getItemsActivityTagFromConfig = config =>
  `/${getStateKeyFromConfig(config)}-items`


export default ({ config }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const {
    getSearchFromUpdate,
    params: { days, keywords, theme, type }
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


  useEffect(() => {
    if (type) return
    history.push(getSearchFromUpdate({ type: 'article' }))
  }, [history, type])


  return (
    <div className="controls">
      <Themes
        onChange={handleChange}
        selectedTheme={theme}
      />
      <div className="right">
        <Types
          onChange={handleChange}
          selectedType={type}
        />
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
