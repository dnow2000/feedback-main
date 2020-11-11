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
    state
  } = task

  return (
    <div className="status">
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
  )
}


export default _
