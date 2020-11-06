/* eslint-disable no-unused-expressions */

import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestData } from 'redux-thunk-data'

import TaskList from 'components/layout/TaskList'


const _ = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestData({
      apiPath: '/jobs/list/registered'
    }))
  }, [dispatch])

  const registered = useSelector(({ data: { jobs } }) => {
    let tasks = {}
    jobs?.forEach(job => {
      tasks = {...tasks, ...job.registered}
    })
    return tasks
  })

  const handleStartJob = useCallback(path => () => {
    dispatch(requestData({
      apiPath: path,
      isMergingDatum: true,
      method: 'POST'
    }))
  }, [dispatch])

  return (
    <div>
      <TaskList
        handleStartJob={handleStartJob}
        items={registered}
      />
    </div>
  )
}

export default _
