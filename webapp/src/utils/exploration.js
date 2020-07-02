import React from 'react'

import ClaimItem from 'components/layout/ClaimItem'


const noop = () => (
  <div>
    NOOP
  </div>
)

export const componentAccessor = node => {
  if (!node) return noop
  const { datum, type } = node
  if (type === 'Claim') {
    return <ClaimItem claim={datum} />
  }
  return noop
}


export const heightAccessor = () => {
  return 200
}


export const widthAccessor = ({ datum, type }) => {
  if (type === 'Claim') {
    return 200
  }
  return 10
}
