import React from 'react'
import { useParams } from 'react-router-dom'

import EntityGraph from 'components/layout/EntityGraph'


export default () => {
  const { verdictId } = useParams()

  return (
    <EntityGraph
      entityId={verdictId}
      isAnonymised
      modelName="Verdict"
    />
  )
}
