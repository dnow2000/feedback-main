import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { requestData, selectEntityByKeyAndId } from 'redux-thunk-data'

import AppearanceItem from 'components/layout/AppearanceItem'
import Loader from 'components/layout/LoadMore'
import selectDataAreAnonymized from 'selectors/selectDataAreAnonymized'
import selectSortedAppearancesByVerdictId from 'selectors/selectSortedAppearancesByVerdictId'


export default () => {
  const dispatch = useDispatch()
  const { verdictId } = useParams()


  const verdict =  useSelector(state =>
    selectEntityByKeyAndId(state, 'verdicts', verdictId))
  const { claimId, contentId } = verdict || {}

  const appearances = useSelector(state =>
    selectSortedAppearancesByVerdictId(state, verdictId))
  const appearancesSortedByShareCount = useMemo(() =>
    appearances?.sort((a, b) =>
      b.quotingContent.totalShares - a.quotingContent.totalShares)
    , [appearances])

  const areDataAnonymized = useSelector(selectDataAreAnonymized)


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


  useEffect(() => {
    let apiPath = `/appearances${areDataAnonymized ? '/anonymized' : ''}?type=APPEARANCE&subType=QUOTATION`
    if (claimId) {
      apiPath = `${apiPath}&quotedClaimId=${claimId}`
    } else if (contentId) {
      apiPath = `${apiPath}&quotedContentId=${contentId}`
    }
    dispatch(requestData({
      apiPath: apiPath
    }))
  }, [areDataAnonymized, claimId, contentId, dispatch, verdictId])


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
