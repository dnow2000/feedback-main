import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { selectCurrentUser } from 'with-react-redux-login'

import selectCurrentRolesByTypes from 'selectors/selectCurrentRolesByTypes'

import { links } from './utils'


export default () => {
  const location = useLocation()

  const currentRoles = useSelector(state =>
    selectCurrentRolesByTypes(state, ['admin', 'editor', 'reviewer']))

  const currentUser = useSelector(selectCurrentUser)

  return (
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
}
