import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'


const _ = ({ task }) => {
  const {
    args,
    hostname,
    kwargs,
    name,
    queue,
    state,
    time,
    uuid
  } = task
  const history = useHistory()


  const handlePushToTask = useCallback(() => {
    history.push(`/tasks/${uuid}`)
  }, [history, uuid])

  return (
    <div
      className="task-item"
      onClick={handlePushToTask}
    >
      <div className="task-identifier">
        {name} <span className="task-uuid"> {uuid} </span>
      </div>
      <div className="task-state">
        {state}
      </div>
      <div className="task-params">
        {JSON.stringify(args)},
        {JSON.stringify(kwargs)}
      </div>
      <div>
        {time}
      </div>
      <div>
        {hostname} {queue}
      </div>
      <div className="task-control">
        <button
          onClick={() => {}}
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}


export default _
