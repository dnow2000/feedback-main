import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import AppearanceItem from 'components/layout/AppearanceItem'
import Loader from 'components/layout/LoadMore'

import { numberShortener } from 'utils/shorteners'


const _ = ({ appearances }) => {
  const linkCount = appearances.length
  const shareCount = appearances
                      ?.map(appearance => appearance.quotingContent.totalShares)
                      ?.reduce((a, b) => a + b, 0)
  const appearancesSortedByShareCount = appearances?.sort((a, b) => b.quotingContent.totalShares - a.quotingContent.totalShares)

  const handleTabClick = useCallback(event => {
    const tabPane = document.getElementById('verdict-tab-pane')
    Array.prototype.map.call(tabPane.children, tab => tab.classList.remove('active'))
    event.target.classList.add('active')
    // TODO: hide and show different tabs
  }, [])

  const showMoreButton = useCallback(props => (
    <div className="show-more">
      <button
        type='button'
        {...props}
      >
        {props.text}
      </button>
    </div>
  ), [])

  const renderItem = useCallback(item => (
    <AppearanceItem
      appearance={item}
      key={item.id}
    />
  ), [])

  if (!appearances.length) {
    return (
      <div className='appearances empty'>
        {'No appearance recorded for this content.'}
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
          { linkCount > 0 && (
            <button
              className='tab active'
              id='links'
              onClick={handleTabClick}
              type='button'
            >
              {`${linkCount} Links`}
            </button>
          ) }
          { shareCount > 0 && (
            <button
              className='tab'
              id='shares'
              onClick={handleTabClick}
              type='button'
            >
              {`${numberShortener(shareCount)} Interactions`}
            </button>
          ) }
        </div>
      ) }

      { appearancesSortedByShareCount && (
        <Loader
          Button={showMoreButton}
          items={appearancesSortedByShareCount}
          loadLessText='Show less'
          loadMoreText='Show more'
          renderItem={renderItem}
        />
      ) }
    </div>
  )
}

_.defaultProps = {
  appearances: []
}

_.propTypes = {
  appearances: PropTypes.arrayOf(
    PropTypes.shape({
      quotingContent: PropTypes.shape({
        id: PropTypes.string,
        totalShares: PropTypes.number
      })
    })
  )
}

export default _
