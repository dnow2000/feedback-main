import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { requestData, selectEntityByKeyAndId } from 'redux-thunk-data'

import AppearanceItem from 'components/layout/AppearanceItem'
import Loader from 'components/layout/LoadMore'
import selectHasCurrentRoleByType from 'selectors/selectHasCurrentRoleByType'
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

  const isAnonymized = useSelector(state =>
    selectHasCurrentRoleByType(state, 'INSPECTOR'))


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
    let apiPath = `/appearances${isAnonymized ? '/anonymized' : ''}?type=APPEARANCE&subType=CITATION`
    if (claimId) {
      apiPath = `${apiPath}&quotedClaimId=${claimId}`
    } else if (contentId) {
      apiPath = `${apiPath}&quotedContentId=${contentId}`
    }
    dispatch(requestData({
      apiPath: apiPath
    }))
  }, [claimId, contentId, dispatch, isAnonymized, verdictId])


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
