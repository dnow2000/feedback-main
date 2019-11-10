import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

import visibleFor from './visibleFor'
import SignoutButtonContainer from 'components/layout/SignoutButton/SignoutButtonContainer'
import { closeNavigation } from 'reducers/navigation'

const links = [
  {
    label: 'Articles',
    path: '/articles',
    visible: () => true
  },
  {
    label: 'Home',
    path: '/',
    visible: () => true
  },
  {
    disabled: true,
    label: 'Reviews',
    path: '/reviews',
    visible: visibleFor(['reviewer'])
  },
  {
    label: 'Trendings',
    path: '/trendings',
    visible: visibleFor(['editor'])
  },
  {
    label: 'Users',
    path: '/users',
    visible: visibleFor(['admin'])
  },
  {
    disabled: true,
    label: 'Verdicts',
    path: '/verdicts',
    visible: visibleFor(['editor'])
  },
]

const Navigation = ({ currentRoles, dispatch, isActive, location, currentUser }) => {
  const classes = classnames({ showing: isActive }, 'navigation')
  return (
    <div
      className={classes}
      onClick={() => dispatch(closeNavigation())}
      onKeyDown={null}
      role="button"
      tabIndex="0"
    >
      <div
        className="list px12 py10"
        onClick={e => {
          e.nativeEvent.stopImmediatePropagation() // Prevent click bubbling and closing modal
          e.stopPropagation()
        }}
        onKeyDown={null}
        role="button"
        tabIndex="0"
      >
        {links &&
          links.filter(({ disabled }) => !disabled)
               .map(({ external, label, target, path, visible }) => (
            visible(currentRoles) && (
              <div className="item" key={label}>
                {path === location.pathname ? (
                  <div className="py12 link current">
                    {label}
                  </div>
                ) : (
                  <NavLink
                    className="block py12 link"
                    id={`see-${path}`}
                    external={external}
                    onClick={() => dispatch(closeNavigation())}
                    to={path}
                    target={target}
                  >
                    {label}
                  </NavLink>
                )}
              </div>
            )))}
        {currentUser && (
          <div className="item">
            <SignoutButtonContainer
              className="block py12 link"
              handleSuccessRedirect={() => '/signin'}
              Tag="a"
            >
              Logout
            </SignoutButtonContainer>
          </div>
        )}
      </div>
    </div>
  )
}

Navigation.defaultProps = {
  currentRoles: null,
  currentUser: null,
  isActive: false,
}

Navigation.propTypes = {
  currentRoles: PropTypes.array,
  currentUser: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dispatch: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  location: PropTypes.object.isRequired,
}

export default Navigation
