import classnames from 'classnames'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { selectCurrentUser } from 'with-react-redux-login'

import { closeMenu } from 'reducers/menu'
import selectCurrentRolesByTypes from 'selectors/selectCurrentRolesByTypes'
import { VERSION } from 'utils/config'

import Signout from './Signout'
import UserAvatar from './UserAvatar'
import { links } from '../utils'



const otherMenuLinks = [
  /*
  {
    label: () => 'My account',
    path: '/account',
    visible: (currentRoles, currentUser) => currentUser
  }
  */
]


export default () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const currentRoles = useSelector(state =>
    selectCurrentRolesByTypes(state, ['admin', 'editor', 'reviewer']))

  const currentUser = useSelector(selectCurrentUser)

  const isMenuActive = useSelector(state => state.menu.isActive)


  const handleCloseMenu = useCallback(() => dispatch(closeMenu()), [dispatch])


  return (
    <>
      <UserAvatar />
      <div
        className={classnames({ showing: isMenuActive }, 'menu')}
        onClick={handleCloseMenu}
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
          {otherMenuLinks.concat(links)
                  .filter(({ disabled }) => !disabled)
                  .map(({ className, external, label, target, path, visible }) => (
              visible(currentRoles, currentUser) && (
                <div
                  className={className || 'item'}
                  key={label}
                >
                  {path === location.pathname ? (
                    <div className="link current">
                      {label(currentRoles)}
                    </div>
                  ) : (
                    <NavLink
                      className="block link"
                      external={external}
                      id={`see-${path}`}
                      onClick={handleCloseMenu}
                      target={target}
                      to={path}
                    >
                      {label(currentRoles)}
                    </NavLink>
                  )}
                </div>
              )))}
          {currentUser && (
            <div className="item item-signout">
              <Signout>
                Logout
              </Signout>
              <div className="version">
                {`v${VERSION}`}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
