import React, { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import AppearanceItem from 'components/layout/AppearanceItem'
import Loader from 'components/layout/LoadMore'
import selectSortedAppearancesByVerdictId from 'selectors/selectSortedAppearancesByVerdictId'


export default () => {
  const { verdictId } = useParams()
  const appearances = useSelector(state =>
    selectSortedAppearancesByVerdictId(state, verdictId))

  const appearancesSortedByShareCount = useMemo(() =>
    appearances?.sort((a, b) =>
      b.quotingContent.totalShares - a.quotingContent.totalShares)
    , [appearances])


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
      <div className='testifier-dashboard empty'>
        {'No appearance recorded for this content.'}
      </div>
    )
  }

  return (
    <Loader
      Button={showMoreButton}
      items={appearancesSortedByShareCount}
      loadLessText='Show less'
      loadMoreText='Show more'
      renderItem={renderItem}
    />
  )
}
