  import classnames from 'classnames'
  import React, { useCallback } from 'react'
  import { useDispatch, useSelector } from 'react-redux'
  import { NavLink } from 'react-router-dom'
  import { selectCurrentUser } from 'with-react-redux-login'

  import Avatar from 'components/layout/Avatar'
  import { closeMenu, showMenu } from 'reducers/menu'


  export default () => {
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const isMenuActive = useSelector(state => state.menu.isActive)

    const handleClick = useCallback(event => {
      event.preventDefault()
      if (!isMenuActive) {
        dispatch(showMenu())
      } else {
        // For keyboard users.
        // Not used for mouseclicks
        // instead we capture clicks via dismiss overlay
        dispatch(closeMenu())
      }
  }, [dispatch, isMenuActive])


    return (
      <div className="user-avatar">
        <NavLink
          className={classnames('link', {
            'is-active': isMenuActive
          })}
          onClick={handleClick}
          to='#footer'
        >
          <Avatar user={currentUser} />
        </NavLink>
      </div>
    )
  }
