import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

import SignoutButtonContainer from 'components/layout/SignoutButton/SignoutButtonContainer'
import { closeMenu } from 'reducers/menu'

import { links } from '../utils'


const Menu = ({ currentRoles, dispatch, isActive, location, currentUser }) => (
  <div
    className={classnames({ showing: isActive }, 'menu')}
    onClick={() => dispatch(closeMenu())}
    onKeyDown={null}
    role="button"
    tabIndex="0"
  >
    <div
      className="items"
      onClick={e => {
        e.nativeEvent.stopImmediatePropagation()
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
            <div className="item navigation" key={label}>
              {path === location.pathname ? (
                <div className="link current">
                  {label(currentRoles)}
                </div>
              ) : (
                <NavLink
                  className="block link"
                  id={`see-${path}`}
                  external={external}
                  onClick={() => dispatch(closeMenu())}
                  to={path}
                  target={target}
                >
                  {label(currentRoles)}
                </NavLink>
              )}
            </div>
          )))}
      {currentUser && (
        <div className="item">
          <SignoutButtonContainer
            className="block link"
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

Menu.defaultProps = {
  currentRoles: null,
  currentUser: null,
  isActive: false,
}

Menu.propTypes = {
  currentRoles: PropTypes.array,
  currentUser: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dispatch: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  location: PropTypes.object.isRequired,
}

export default Menu
