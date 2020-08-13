import React from 'react'

import ClaimItem from 'components/layout/ClaimItem'


export const componentAccessor = node => {
  if (!node) return
  const { datum, type } = node
  if (type === 'Claim') {
    return <ClaimItem claim={datum} />
  }
  return
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
