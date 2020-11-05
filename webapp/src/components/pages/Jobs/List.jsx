import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestData } from 'redux-thunk-data'
import classnames from 'classnames'

import capitalizeAll from 'utils/capitalizeAll'


const _ = () => {
  const dispatch = useDispatch()
  const [tasksType, setTasksType] = useState('active')
  const types = ['active', 'reserved', 'registered', 'revoked', 'scheduled']

  useEffect(() => {
    dispatch(requestData({
      apiPath: `/jobs/list/${tasksType}`
    }))
  }, [dispatch, tasksType])

  const info = useSelector(({ data: { jobs } }) => jobs)

  const handleTypeChange = useCallback(value => () => {
    setTasksType(value)
  }, [])

  return (
    <>
      <ul>
        {types.map(type => {
          return (
            <button
              className={classnames("tasks-type", { active: tasksType === type })}
              key={type}
              onClick={handleTypeChange(type)}
              type="button"
            >
              { capitalizeAll(type, "_") }
            </button>
          )
        })}
      </ul>
      <div>
        <pre>
          <code>
            {JSON.stringify(info?.[0], null, 2)}
          </code>
        </pre>
      </div>
    </>
  )
}

export default _
