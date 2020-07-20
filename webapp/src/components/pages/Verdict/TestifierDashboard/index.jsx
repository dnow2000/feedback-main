import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { requestData, selectEntityByKeyAndId } from 'redux-thunk-data'

import VerdictItem from 'components/layout/VerdictItem'
import selectSortedAppearancesByQuotedClaimId from 'selectors/selectSortedAppearancesByQuotedClaimId'
import { verdictNormalizer } from 'utils/normalizers'

import Appearances from './Appearances'


export default () => {
  const dispatch = useDispatch()
  const { verdictId } = useParams()

  const verdict =  useSelector(state =>
    selectEntityByKeyAndId(state, 'verdicts', verdictId))
  const { claimId } = verdict || {}
  const quotedFromAppearances = useSelector(state =>
    selectSortedAppearancesByQuotedClaimId(state, claimId))


  useEffect(() => {
    dispatch(requestData({
      apiPath: `/verdicts/${verdictId}/appearances`,
      normalizer: verdictNormalizer
    }))
  }, [dispatch, verdictId])


  return (
    <>
      {verdict && (
        <VerdictItem
          verdict={verdict}
          withLinksShares={false}
        />
      )}
      {quotedFromAppearances &&
        <Appearances
          appearances={quotedFromAppearances}
        />}
    </>
  )
}
