import classnames from 'classnames'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { selectCurrentUser } from 'with-react-redux-login'

import { closeMenu } from 'reducers/menu'
import selectCurrentRolesByTypes from 'selectors/selectCurrentRolesByTypes'

import Signout from './Signout'
import UserAvatar from './UserAvatar'
import { links } from '../utils'


export default () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const currentRoles = useSelector(state =>
    selectCurrentRolesByTypes(state, ['admin', 'editor', 'reviewer']))

  const currentUser = useSelector(selectCurrentUser)

  const isMenuActive = useSelector(state => state.menu.isActive)


  return (
    <>
      <UserAvatar />
      <div
        className={classnames({ showing: isMenuActive }, 'menu')}
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
              <Signout>
                Logout
              </Signout>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
