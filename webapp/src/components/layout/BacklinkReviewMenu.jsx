import React from 'react'


export default ({ handleHideAll, handleShowForm }) => {
  return (
    <div className='backlink-container'>
      <div className='backlink-menu'>
        <h4>
          {'Does this url contain the original claim?'}
        </h4>
        <div className='backlink-menu-buttons'>
          <button
            className='yes'
            onClick={handleShowForm}
            type='button'
          >
            {'Yes'}
          </button>
          <button
            className='no'
            onClick={handleHideAll}
            type='button'
          >
            {'No'}
          </button>
        </div>
      </div>
    </div>
  )
}
