import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { requestData, selectEntityByKeyAndId } from 'redux-thunk-data'

import LinkItem from 'components/layout/LinkItem'
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
      b.linkingContent.totalShares - a.linkingContent.totalShares)
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
    <LinkItem
      appearance={item}
      key={item.id}
    />
  ), [])


  useEffect(() => {
    let apiPath = `/appearances${areDataAnonymized ? '/anonymized' : ''}?type=APPEARANCE&subType=QUOTATION`
    if (claimId) {
      apiPath = `${apiPath}&linkedClaimId=${claimId}`
    } else if (contentId) {
      apiPath = `${apiPath}&linkedContentId=${contentId}`
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
