import React from 'react'

import ClaimItem from 'components/layout/ClaimItem'


const noop = ({datum}) => (
  <div>
    OK
  </div>
)

export const componentAccessor = ({ datum, type }) => {
  console.log({type})
  if (type === 'Claim') {
    console.log({datum})
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
