import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import AvatarContainer from '../Avatar/AvatarContainer'
import HamburgerContainer from '../Hamburger/HamburgerContainer'
import Logo from '../Logo'
import NavigationContainer from '../Navigation/NavigationContainer'

const signPathnames = ['/signin', '/signup']

const Header = ({ currentUser, location, whiteHeader }) => {
  const isSignPathname = signPathnames.includes(location.pathname)

  return (
    <Fragment>
      <header className="header flex-start flex-columns items-center p12">
        <div className="mr12">
          <Logo />
        </div>
        <AvatarContainer whiteHeader={whiteHeader} />
        <div className="flex-auto" />
        {currentUser && !isSignPathname ? (
          <HamburgerContainer />
        ) : (
          !isSignPathname && (
            <NavLink className="button is-primary" to="/signin">
              Sign In
            </NavLink>
          )
        )}
      </header>
      <NavigationContainer />
    </Fragment>
  )
}

Header.defaultProps = {
  currentUser: null,
  whiteHeader: false,
}

Header.propTypes = {
  currentUser: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  location: PropTypes.object.isRequired,
  whiteHeader: PropTypes.bool,
}

export default Header
