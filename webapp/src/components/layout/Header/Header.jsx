import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import AvatarContainer from 'components/layout/Avatar/AvatarContainer'
import HamburgerContainer from 'components/layout/Hamburger/HamburgerContainer'
import Logo from 'components/layout/Logo'
import NavigationContainer from 'components/layout/Navigation/NavigationContainer'

const signPathnames = ['/signin', '/signup']


const Header = ({ currentUser, location, whiteHeader }) => {
  const [isScrolling, setIsScrolling] = useState()
  const isSignPathname = signPathnames.includes(location.pathname)

  useEffect(() => {
    const handleScroll = event => {
      const nextIsScrolling = window.scrollY !== 0
      setIsScrolling(nextIsScrolling)
    }
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener(handleScroll)
    }
  }, [])


  return (
    <Fragment>
      <header className={classnames("header", { scrolling: isScrolling })}>
        <div className="left-content">
          <Logo withName />
        </div>

        <div className="flex-auto" />
        {currentUser && !isSignPathname ? (
          <Fragment>
            <HamburgerContainer />
            <AvatarContainer whiteHeader={whiteHeader} />
          </Fragment>
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
