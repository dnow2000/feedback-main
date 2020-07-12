import classnames from 'classnames'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { selectCurrentUser } from 'with-react-redux-login'

import { closeMenu } from 'reducers/menu'
import selectVisibleLinksByComponentName from 'selectors/selectVisibleLinksByComponentName'
import { VERSION } from 'utils/config'

import Signout from './Signout'
import UserAvatar from './UserAvatar'


export default () => {
  const dispatch = useDispatch()
  const location = useLocation()


  const currentUser = useSelector(selectCurrentUser)

  const visibleLinks = useSelector(state =>
    selectVisibleLinksByComponentName(state, 'Menu'))
  const showMenu = currentUser || visibleLinks.filter(({componentNames}) =>
    componentNames === ['Menu']).length

  const isMenuActive = useSelector(state => state.menu.isActive)


  const handleCloseMenu = useCallback(() => dispatch(closeMenu()), [dispatch])

  const handleStopPropagation = useCallback(event => {
    event.nativeEvent.stopImmediatePropagation()
    event.stopPropagation()
  }, [])


  if (!showMenu) return null


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
          onClick={handleStopPropagation}
          onKeyDown={null}
          role="button"
          tabIndex="0"
        >
          {visibleLinks.map(({ external, label, path, target }) => (
              <div
                className="item"
                key={label}
              >
                {path === location.pathname ? (
                  <div className="link current">
                    {label}
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
                    {label}
                  </NavLink>
                )}
              </div>
            ))}
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
