import PropTypes from 'prop-types'
import React from 'react'

import { ROOT_ASSETS_PATH } from 'utils/config'

export const Icon = ({ name, path, ...imgProps }) => (
  <img
    {...imgProps}
    alt={name}
    className={imgProps.className || 'icon'}
    src={`${path}/${name}`}
  />
)

Icon.defaultProps = {
  path: ROOT_ASSETS_PATH
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string
}

export default Icon
