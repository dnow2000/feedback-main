import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

import { ROOT_PATH } from '../../utils/config'

const Logo = ({ className }) => (
  <NavLink
    className={`logo ${className || ''}`}
    isActive={() => false}
    to='/'
  >
    <img src={`${ROOT_PATH}/icons/logo.png`} alt="Logo" />
  </NavLink>
)

Logo.defaultProps = {
  className: ''
}

Logo.propTypes = {
  className: PropTypes.string
}

export default Logo
