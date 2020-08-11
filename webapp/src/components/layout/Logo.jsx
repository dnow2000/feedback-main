import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

import { ROOT_ASSETS_PATH } from 'utils/config'

const Logo = ({ asLink, text, type }) => {
  let name = "sciencefeedback_logo.png"
  if (type === "header") {
    name = "sciencefeedback_logo.png"
  } else if (type === "footer") {
    name = "logo_footer"
  }

  return asLink ? (
    <NavLink
      className='logo'
      to='/'
    >
      <img
        alt="sciencefeedback-logo"
        src={`${ROOT_ASSETS_PATH}/${name}`}
      />
      <p>
        {text}
      </p>
    </NavLink>
  ) : (
    <div className='logo'>
      <img
        alt="sciencefeedback-logo"
        src={`${ROOT_ASSETS_PATH}/${name}`}
      />
      <p>
        {text}
      </p>
    </div>
  )
}

Logo.defaultProps = {
  asLink: true,
  text: 'Science Feedback',
  type: null
}

Logo.propTypes = {
  asLink: PropTypes.bool,
  text: PropTypes.string,
  type: PropTypes.string,
}

export default Logo
