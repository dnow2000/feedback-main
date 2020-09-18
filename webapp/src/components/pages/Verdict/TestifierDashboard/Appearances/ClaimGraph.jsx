import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectEntityByKeyAndId } from 'redux-thunk-data'

import EntityGraph from 'components/layout/EntityGraph'


export default () => {
  const { verdictId } = useParams()

  const verdict =  useSelector(state =>
    selectEntityByKeyAndId(state, 'verdicts', verdictId))
  const { claimId } = verdict || {}

  return (
    <EntityGraph
      collectionName="claims"
      entityId={claimId}
    />
  )
}
