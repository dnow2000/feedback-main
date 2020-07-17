import React, { useCallback } from 'react'

import AppearanceItem from 'components/layout/AppearanceItem'


export default ({ appearances }) => {
  const linkCount = appearances?.length
  const shareCount = appearances
                      ?.map(appearance => appearance.quotingContent.totalShares)
                      ?.reduce((a, b) => a + b, 0)

  const handleTabClick = useCallback(event => {
    const tabPane = document.getElementById('verdict-tab-pane')
    Array.prototype.map.call(tabPane.children, tab => tab.classList.remove('active'))
    event.target.classList.add('active')
    // TODO: hide and show different tabs
  }, [])

  const showMore = useCallback(event => {
    console.log(`show more ${event}`)
  }, [])


  if (!appearances.length) {
    return (
      <div>
        {'Does not appear anywhere'}
      </div>
    )
  }

  return (
    <div className="appearances">
      {/*<Add />*/}
      { appearances &&  (
        <div
          className='tab-pane'
          id='verdict-tab-pane'
        >
          <button
            className='tab active'
            id='links'
            onClick={handleTabClick}
            type='button'
          >
            {`${linkCount} Links`}
          </button>
          <button
            className='tab'
            id='shares'
            onClick={handleTabClick}
            type='button'
          >
            {`${shareCount || '42'} Shares`}
          </button>
        </div>
      ) }

      { appearances && appearances.map(appearance => (
        <AppearanceItem
          appearance={appearance}
          key={appearance.id}
        />
      )) }

      <div className="show-more">
        <button
          className="button is-primary is-outlined thin"
          onClick={showMore}
          type='button'
        >
          {'Show more'}
        </button>
      </div>
    </div>
  )
}
