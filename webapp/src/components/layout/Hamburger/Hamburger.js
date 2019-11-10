import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

import {
  closeNavigation,
  showNavigation
} from 'reducers/navigation'

const Hamburger = ({
  className,
  dispatch,
  isNavigationActive
}) => (
  <div className={className || 'hamburger'}>
    <NavLink
      className={classnames('link', {
        'is-active': isNavigationActive
      })}
      to='#footer'
      onClick={e => {
        e.preventDefault()
        if (!isNavigationActive) {
          dispatch(showNavigation())
        } else {
          // For keyboard users.
          // Not used for mouseclicks
          // instead we capture clicks via dismiss overlay
          dispatch(closeNavigation())
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
  isNavigationActive: false
}

Hamburger.propTypes = {
  className: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  isNavigationActive: PropTypes.bool
}

export default Hamburger
