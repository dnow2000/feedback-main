import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectEntityByKeyAndId } from 'redux-thunk-data'

import EntityGraph from 'components/layout/EntityGraph'
import selectDataAreAnonymized from 'selectors/selectDataAreAnonymized'


export default () => {
  const { verdictId } = useParams()


  const verdict =  useSelector(state =>
    selectEntityByKeyAndId(state, 'verdicts', verdictId))
  const { claimId } = verdict || {}

  const areDataAnonymized = useSelector(selectDataAreAnonymized)

  return (
    <EntityGraph
      entityId={claimId}
      isAnonymized={areDataAnonymized}
      modelName="Claim"
    />
  )
}
