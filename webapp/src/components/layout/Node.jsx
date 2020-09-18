import React from 'react'

import ClaimItem from 'components/layout/ClaimItem'


export default ({ node }) => {
  const { datum, type } = node
  if (type === 'Claim') {
    return <ClaimItem claim={datum} />
  }
  return null
}
