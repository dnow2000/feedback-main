import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'


import Controls from 'components/layout/Controls'
import KeywordsBar from 'components/layout/KeywordsBar'
import Header from 'components/layout/Header'
import Items from 'components/layout/Items'
import Main from 'components/layout/Main'
import Types from 'components/layout/Types'
import useLocationURL from 'components/uses/useLocationURL'

import TaskItem from './TaskItem'

const taskStates = [
  { label: 'active', value: 'active' },
  { label: 'reserved', value: 'reserved' },
  { label: 'revoked', value: 'revoked' },
]



export default () => {
  const dispatch = useDispatch()
  const locationURL = useLocationURL()

  const config = useMemo(() => ({
    apiPath: `/tasks${locationURL.search}`,
  }), [locationURL])

  const taskTypes = useSelector(state => state.data.taskTypes)

  const renderItem = useCallback(item =>
    <TaskItem task={item} />, [])


  useEffect(() => {
    dispatch(requestData({
      apiPath: '/taskTypes'
    }))
  }, [dispatch])


  if (!taskTypes) return null


  return (
    <>
      <Header withLinks />
      <Main className="tasks">
        <div className="container">
          <Controls
            config={config}
            render={({handleChange, locationURL}) => (
              <>
                <KeywordsBar
                  onChange={handleChange}
                  selectedKeywords={locationURL.searchParams.get('keywords')}
                />
                <div className="search-spacing" />
                <div className="controls">
                  <Types
                    onChange={handleChange}
                    options={taskTypes}
                    placeholder='Select a task type'
                    selectedType={locationURL.searchParams.get('type')}
                  />
                  <Types
                    onChange={handleChange}
                    options={taskStates}
                    placeholder='Select a state'
                    searchKey='state'
                    selectedType={locationURL.searchParams.get('state')}
                  />
                  <div className="right">
                    <NavLink
                      to="/tasks/creation"
                    >
                      Create Task
                    </NavLink>
                  </div>
                </div>
              </>
            )}
          />
          <Items
            cols={1}
            config={config}
            renderItem={renderItem}
          />
        </div>
      </Main>
    </>
  )
}
