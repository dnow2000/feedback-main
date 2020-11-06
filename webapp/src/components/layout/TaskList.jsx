import React from 'react'

import TaskItem from 'components/layout/TaskItem'


export default ({ handleStartJob, items }) => (
  <>
    { Object.entries(items).map(([cat, tasks]) => {
      return (
        <div
          className='task-category'
          key={cat}
        >
          <h3 className='task-category-name'>
            {cat.toUpperCase()}
          </h3>
          { tasks.map(task => (
            <TaskItem
              handleStartJob={handleStartJob}
              key={task.name}
              task={task}
            />
          )) }
        </div>
      )
    }) }
  </>
)
