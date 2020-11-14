import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import Dotdotdot from 'react-dotdotdot'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'


const niceDurationFrom = seconds => {
  const format = val => `0${Math.floor(val)}`.slice(-2)
  const hours = seconds / 3600
  const minutes = (seconds % 3600) / 60

  return [hours, minutes, seconds % 60].map(format).join(':')
}


const DELETE_STATES = ['failure', 'stopped', 'success']


const _ = ({ task }) => {
  const {
    args,
    celeryUuid,
    creationTime,
    id,
    hostname,
    kwargs,
    name,
    queue,
    result,
    state,
    stopTime,
    startTime,
    traceback
  } = task
  const canDelete = DELETE_STATES.includes(state)
  const startDate = new Date(startTime)
  const duration = stopTime
    ? niceDurationFrom(new Date(stopTime) - startDate)
    : ''
  const dispatch = useDispatch()
  const history = useHistory()

  const handleCancelOrDelete = useCallback(event => {
    event.stopPropagation()
    dispatch(requestData({
      apiPath: `/tasks/${id}`,
      body: canDelete
        ? null
        : { state: 'REVOKED' },
      method: canDelete
        ? 'DELETE'
        : 'PUT'
    }))
  }, [canDelete, dispatch, id])

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
      <div className="task-status">

        <div className="task-process">
          <div>
            <span className="task-machine">
              {'queue '}
              {queue}
            </span>
            {hostname && (
              <>
                <br />
                <span className="task-machine">
                  {hostname}
                </span>
              </>
            )}
            <br />
            <span className="task-time">
              {'created '}
              {creationTime.split('.')[0]}
            </span>
            {startTime && (
              <>
                <br />
                <span className="task-time">
                  {'started '}
                  {startTime.split('.')[0]}
                </span>
              </>)}
            {duration && (
              <>
                <br />
                <span className="task-time">
                  {'duration '}
                  {duration}
                </span>
              </>)}
          </div>
          <div className="task-state">
            {state.toUpperCase()}
          </div>
        </div>


        <div className="task-params">
          {'args: '}
          {JSON.stringify(args)}
          <br />
          {'kwargs: '}
          {JSON.stringify(kwargs)}
          {result && (
            <>
              <br />
              <Dotdotdot clamp={2}>
                {'result: '}
                {JSON.stringify(result)}
              </Dotdotdot>
            </>
          )}
          {traceback && (
            <>
              <br />
              <Dotdotdot clamp={2}>
                {'traceback: '}
                {JSON.stringify(traceback)}
              </Dotdotdot>
            </>)}
        </div>
        <button
          className="task-cancel"
          onClick={handleCancelOrDelete}
          type="button"
        >
          {canDelete
              ? 'Delete'
              : 'Cancel'}
        </button>
      </div>
    </div>
  )
}

_.propTypes = {
  task: PropTypes.shape({
    args: PropTypes.array,
    celeryUuid: PropTypes.string,
    creationTime: PropTypes.string,
    id: PropTypes.string,
    hostname: PropTypes.string,
    kwargs: PropTypes.shape(),
    name: PropTypes.string,
    result: PropTypes.string,
    queue: PropTypes.string,
    state: PropTypes.string,
    stopTime: PropTypes.string,
    startTime: PropTypes.string,
    traceback: PropTypes.string,
  }).isRequired
}

/*



  </div>
  <div className="task-state">
    {state.toUpperCase()}
  </div>
*/

export default _
