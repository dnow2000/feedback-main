import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

import Avatar from 'components/layout/Avatar'
import { closeMenu, showMenu } from 'reducers/menu'

const UserAvatar = ({
  currentUser,
  disabled,
  dispatch,
  isMenuActive
}) => (
  <div className="user-avatar">
    <NavLink
      className={classnames('link', {
        'is-active': isMenuActive
      })}
      disabled={disabled}
      to='#footer'
      onClick={event => {
        event.preventDefault()
        if (!isMenuActive && !disabled) {
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

UserAvatar.defaultProps = {
  className: '',
  currentUser: null,
  disabled: false,
  isMenuActive: false
}

UserAvatar.propTypes = {
  className: PropTypes.string,
  currentUser: PropTypes.shape(),
  disabled: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  isMenuActive: PropTypes.bool
}

export default UserAvatar
