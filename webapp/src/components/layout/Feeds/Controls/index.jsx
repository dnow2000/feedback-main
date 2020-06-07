import { getStateKeyFromConfig } from 'fetch-normalize-data'
import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { deleteData } from 'redux-thunk-data'

import Days from './Days'
import KeywordsBar from './KeywordsBar'
import Themes from './Themes'
import Types from './Types'


export const getItemsActivityTagFromConfig = config =>
  `/${getStateKeyFromConfig(config)}-items`


export default ({ config }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { pathname, search } = useLocation()
  const url = useMemo(() =>
    new URL(`${ROOT_PATH}${pathname}${search}`), [pathname, search])

  const handleChange =  useCallback((key, value) => {
    const isEmptyValue = typeof value === 'undefined' || value === ''
    const nextValue = isEmptyValue ? null : value
    url.searchParams.set(key, nextValue)
    if (url.search === search) return
    dispatch(deleteData(null, { tags: [getItemsActivityTagFromConfig(config)] }))
    setTimeout(() => history.push(`${url.pathname}${url.search}`))
  }, [config, dispatch, history, search, url])


  useEffect(() => {
    if (type) return
    url.searchParams.set('type', 'content')
    history.push(`${url.pathname}${url.search}`)
  }, [history, type, url])


  return (
    <div className="controls">
      <Themes
        onChange={handleChange}
        selectedTheme={url.searchParams.get('theme')}
      />
      <div className="right">
        {!location.pathname.startsWith('/verdicts') && (<Types
          onChange={handleChange}
          selectedType={url.searchParams.get('type')}
        />)}
        <Days
          onChange={handleChange}
          selectedDays={url.searchParams.get('days')}
        />
        <KeywordsBar
          onChange={handleChange}
          selectedKeywords={url.searchParams.get('keywords')}
        />
      </div>
    </div>
  )
}
