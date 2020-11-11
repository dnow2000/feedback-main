import React from 'react'


const _ = ({ task }) => {
  const {
    args,
    id,
    hostname,
    kwargs,
    name,
    queue,
    state,
    time
  } = task

  return (
    <div className="task-item">
      <div className="task-identifier">
        {name} <span className="task-id"> {id} </span>
      </div>
      <div>
        {state}
      </div>
      <div>
        {JSON.stringify(args)},
        {JSON.stringify(kwargs)}
      </div>
      <div>
        {time}
      </div>
      <div>
        {hostname} {queue}
      </div>
    </div>
  )
}


export default _
