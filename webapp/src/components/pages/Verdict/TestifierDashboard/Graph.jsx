import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectEntityByKeyAndId } from 'redux-thunk-data'

import EntityGraph from 'components/layout/EntityGraph'
import selectHasCurrentRoleByType from 'selectors/selectHasCurrentRoleByType'


export default () => {
  const { verdictId } = useParams()


  const verdict =  useSelector(state =>
    selectEntityByKeyAndId(state, 'verdicts', verdictId))
  const { claimId } = verdict || {}

  const isAnonymized = useSelector(state =>
    selectHasCurrentRoleByType(state, 'INSPECTOR'))

  return (
    <EntityGraph
      entityId={claimId}
      isAnonymized={isAnonymized}
      modelName="Claim"
    />
  )
}
