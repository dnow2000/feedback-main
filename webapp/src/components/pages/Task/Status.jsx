import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectEntityByKeyAndId } from 'redux-thunk-data'


const _ = () => {
  const { taskId } = useParams()

  const task = useSelector(state =>
    selectEntityByKeyAndId(state, 'tasks', taskId))

  if (!task) return null

  const {
    celeryUuid,
    hostname,
    queue,
    state,
    traceback
  } = task

  return (
    <div className="status">
      <div className="machine">
        <div>
          {celeryUuid}
        </div>
        <div className="task-process">
          {queue}
          <br />
          {hostname}
          <br />
          {state.toUpperCase()}
        </div>
      </div>
      {state === 'failure' && (
        <div className="failure">
          {traceback.split(', line').map((line, index) => (
            <div
              className="line"
              key={line}
            >
              {index ? 'line' : ''}
              {line}
            </div>
          ))}
        </div>)}
    </div>
  )
}


export default _
