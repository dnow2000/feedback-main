import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'


const niceDurationFrom = seconds => {
  const format = val => `0${Math.floor(val)}`.slice(-2)
  const hours = seconds / 3600
  const minutes = (seconds % 3600) / 60

  return [hours, minutes, seconds % 60].map(format).join(':')
}


const _ = ({ task }) => {
  const {
    args,
    celeryUuid,
    id,
    hostname,
    kwargs,
    name,
    queue,
    state,
    stopTime,
    startTime
  } = task
  const startDate = new Date(startTime)
  const duration = stopTime
    ? niceDurationFrom(new Date(stopTime) - startDate)
    : ''
  const dispatch = useDispatch()
  const history = useHistory()

  const handleStop = useCallback(() =>
    requestData(dispatch({
      apiPath: `/tasks/${id}`,
      body: {
        state: 'STOPPED'
      },
      method: 'PUT'
    })), [dispatch, id])

  const handleDelete = useCallback(() =>
    requestData(dispatch({
      apiPath: `/tasks/${id}`,
      method: 'DELETE'
    })), [dispatch, id])

  const handlePushToTask = useCallback(() =>
    history.push(`/tasks/${id}`), [history, id])

  return (
    <div
      className="task-item"
      onClick={handlePushToTask}
      onKeyPress={handlePushToTask}
      role="button"
      tabIndex="0"
    >
      <div className="task-identifier">
        {name}
        <br />
        <span className="task-uuid">
          {celeryUuid}
        </span>
      </div>
      <div className="task-process">
        {queue}
        <br />
        {hostname}
        <br />
        {state.toUpperCase()}
      </div>
      <div className="task-params">
        {JSON.stringify(args)}
        <br />
        {JSON.stringify(kwargs)}
      </div>
      <div className="task-times">
        {startTime.split('.')[0]}
        <br />
        {duration}
      </div>
      <button
        className="task-stop"
        onClick={handleStop}
        type="button"
      >
        Stop
      </button>
      <button
        className="task-delete"
        onClick={handleDelete}
        type="button"
      >
        Delete
      </button>
    </div>
  )
}

_.propTypes = {
  task: PropTypes.shape({
    args: PropTypes.arrayOf(),
    celeryUuid: PropTypes.string,
    id: PropTypes.string,
    hostname: PropTypes.string,
    kwargs: PropTypes.shape(),
    name: PropTypes.string,
    queue: PropTypes.string,
    state: PropTypes.string,
    stopTime: PropTypes.string,
    startTime: PropTypes.string
  }).isRequired
}


export default _
