import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

import { ROOT_ASSETS_PATH } from 'utils/config'

const Logo = ({ type }) => {
  let name = "logo.svg"
  if (type === "header") {
    name = "logo_header.png"
  } else if (type === "footer") {
    name = "logo_footer"
  }

  return (
    <NavLink
      className='logo'
      isActive={() => false}
      to='/'
    >
      <img src={`${ROOT_ASSETS_PATH}/${name}`} alt="Logo" />
    </NavLink>
  )
}

Logo.defaultProps = {
  type: null
}

Logo.propTypes = {
  type: PropTypes.string,
}

export default Logo
