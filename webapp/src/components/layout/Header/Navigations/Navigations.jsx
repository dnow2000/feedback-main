import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

import { links } from '../utils'

const Navigations = ({ currentRoles, currentUser, location }) => (
  <div className="navigations">
  {links &&
    links.filter(({ disabled }) => !disabled)
         .map(({ external, label, target, path, visible }) => (
      visible(currentRoles) && (
        <div className="navigation" key={label}>
          {path === location.pathname ? (
            <div className="current">
              {label(currentRoles)}
            </div>
          ) : (
            <NavLink
              className="anchor"
              id={`see-${path}`}
              external={external}
              to={path}
              target={target}
            >
              {label(currentRoles)}
            </NavLink>
          )}
        </div>
      )))}
  </div>
)

Navigations.defaultProps = {
  currentRoles: null,
  currentUser: null
}

Navigations.propTypes = {
  currentRoles: PropTypes.array,
  currentUser: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default Navigations
