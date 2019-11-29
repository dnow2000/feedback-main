import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

import { ROOT_PATH } from 'utils/config'

const Logo = ({ className, withName }) => (
  <NavLink
    className={classnames(className || 'logo', { 'with-name': withName })}
    isActive={() => false}
    to='/'
  >
    <img src={`${ROOT_PATH}/icons/logo.png`} alt="Logo" />
    {withName && <span> Science <b>Feedback</b> </span>}
  </NavLink>
)

Logo.defaultProps = {
  className: '',
  withName: false
}

Logo.propTypes = {
  className: PropTypes.string,
  withName: PropTypes.bool,
}

export default Logo
