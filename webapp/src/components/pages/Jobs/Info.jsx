import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestData } from 'redux-thunk-data'
import classnames from 'classnames'

import capitalizeAll from 'utils/capitalizeAll'


const _ = () => {
  const dispatch = useDispatch()
  const [infoType, setInfoType] = useState('active_queues')
  const types = ['active_queues', 'conf', 'ping', 'query_task', 'stats', 'timeout']

  useEffect(() => {
    dispatch(requestData({
      apiPath: `/jobs/info/${infoType}`
    }))
  }, [dispatch, infoType])

  const info = useSelector(({ data: { jobs } }) => jobs)

  const handleTypeChange = useCallback(value => () => {
    setInfoType(value)
  }, [])

  return (
    <>
      <ul>
        {types.map(type => {
          return (
            <button
              className={classnames("info-type", { active: infoType === type })}
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
