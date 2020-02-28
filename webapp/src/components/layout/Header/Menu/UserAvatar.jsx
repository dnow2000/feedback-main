import classnames from 'classnames'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { selectCurrentUser } from 'with-react-redux-login'

import Avatar from 'components/layout/Avatar'
import { closeMenu, showMenu } from 'reducers/menu'


export default () => {
  const dispatch = useDispatch()


  const currentUser = useSelector(selectCurrentUser)

  const isMenuActive = useSelector(state => state.menu.isActive)

  const isAtTop = useSelector(state => state.scroll.isAtTop)


  return (
    <div className="user-avatar">
      <NavLink
        className={classnames('link', {
          'is-active': isMenuActive
        })}
        disabled={!isAtTop}
        to='#footer'
        onClick={event => {
          event.preventDefault()
          if (!isMenuActive && isAtTop) {
            dispatch(showMenu())
          } else {
            // For keyboard users.
            // Not used for mouseclicks
            // instead we capture clicks via dismiss overlay
            dispatch(closeMenu())
          }
        }}
      >
        <Avatar user={currentUser} />
      </NavLink>
    </div>
  )
}
