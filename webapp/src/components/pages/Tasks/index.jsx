import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'


import Controls from 'components/layout/Controls'
import KeywordsBar from 'components/layout/KeywordsBar'
import Header from 'components/layout/Header'
import Items from 'components/layout/Items'
import Main from 'components/layout/Main'
import Selector from 'components/layout/Selector'
import useLocationURL from 'components/uses/useLocationURL'

import TaskItem from './TaskItem'


export default () => {
  const dispatch = useDispatch()
  const locationURL = useLocationURL()

  const config = useMemo(() => ({
    apiPath: `/tasks${locationURL.search}`,
  }), [locationURL])


  const taskNameOptions = useSelector(state => state.data.taskNameOptions)

  const taskStateOptions = useSelector(state => state.data.taskStateOptions)


  const renderItem = useCallback(item =>
    <TaskItem task={item} />, [])


  useEffect(() => {
    dispatch(requestData({ apiPath: '/taskNameOptions' }))
    dispatch(requestData({ apiPath: '/taskStateOptions' }))
  }, [dispatch])


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
                  <Selector
                    onChange={handleChange}
                    options={taskNameOptions}
                    placeholder='Select a task name'
                    searchKey='name'
                    selectedValue={locationURL.searchParams.get('name')}
                  />
                  <Selector
                    onChange={handleChange}
                    options={taskStateOptions}
                    placeholder='Select a state'
                    searchKey='state'
                    selectedValue={locationURL.searchParams.get('state')}
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
