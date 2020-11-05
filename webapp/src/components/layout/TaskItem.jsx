import React from 'react'


export default ({ handleStartJob, task }) => (
  <div className='task-item'>
    <span className='task-name'>
      {`${task.name}:`}
    </span>
    <div className='task-interactions'>
      <div className='task-buttons'>
        <button
          className='task-button-start'
          onClick={handleStartJob(task.path)}
          type='button'
        >
          {'Start'}
        </button>
        <button
          disabled
          type='button'
        >
          {'Revoke'}
        </button>
      </div>
      <div className='task-status'>
        {task.status || 'STATUS UNKNOWN'}
      </div>
    </div>
  </div>
)
