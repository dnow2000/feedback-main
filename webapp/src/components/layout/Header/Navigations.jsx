import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'

import selectVisibleLinksByComponentName from 'selectors/selectVisibleLinksByComponentName'


export default () => {
  const location = useLocation()

  const visibleLinks = useSelector(state =>
    selectVisibleLinksByComponentName(state, 'Navigations'))


  return (
    <div className="navigations">
      {visibleLinks.map(({ external, label, path, target }) => (
        <div
          className="navigation"
          key={label}
        >
          {path === location.pathname ? (
            <div className="current">
              {label}
            </div>
          ) : (
            <NavLink
              className="anchor"
              external={external}
              id={`see-${path}`}
              target={target}
              to={path}
            >
              {label}
            </NavLink>
          )}
        </div>
      ))}
    </div>
  )
}
