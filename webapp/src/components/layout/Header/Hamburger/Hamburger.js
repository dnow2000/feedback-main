import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

import { closeMenu, showMenu } from 'reducers/menu'

const Hamburger = ({
  className,
  disabled,
  dispatch,
  isMenuActive
}) => (
  <div className={className || 'hamburger'}>
    <NavLink
      className={classnames('link', {
        'is-active': isMenuActive
      })}
      disabled={disabled}
      to='#footer'
      onClick={e => {
        e.preventDefault()
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
      <div className='link-box'>
        <div className='link-inner' />
      </div>
    </NavLink>
  </div>
)

Hamburger.defaultProps = {
  className: '',
  disabled: false,
  isMenuActive: false
}

Hamburger.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  isMenuActive: PropTypes.bool
}

export default Hamburger
