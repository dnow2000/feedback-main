import React from 'react'

import { ROOT_PATH } from 'utils/config'

const Icon = ({ svg, name, ...imgProps }) => {
  if (!Icon.rootPath) {
    console.warn('You need to define a rootPath for your Icon')
  }
  return (
    <img
      {...imgProps}
      alt={svg}
      className={imgProps.className || 'icon'}
      src={`${Icon.rootPath}/icons/${svg}.svg`}
    />
  )
}

Icon.rootPath = ROOT_PATH

export default Icon
