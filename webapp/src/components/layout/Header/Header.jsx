import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'


import Logo from '../Logo'
import MenuContainer from './Menu/MenuContainer'
import NavigationsContainer from './Navigations/NavigationsContainer'
import UserAvatarContainer from './UserAvatar/UserAvatarContainer'


const signPathnames = ['/signin', '/signup']

const Header = ({ currentUser, location, whiteHeader }) => {
  const [isScrolling, setIsScrolling] = useState()
  const isSignPathname = signPathnames.includes(location.pathname)

  useEffect(() => {
    const handleScroll = event => {
      const nextIsScrolling = window.scrollY > 50
      setIsScrolling(nextIsScrolling)
    }
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])


  return (
    <header className={classnames("header", { scrolling: isScrolling })}>
      <div className="container">
        <div className="left-content">
          <Logo type="header" />
        </div>

        <div className="flex-auto" />
        {currentUser && !isSignPathname ? (
          <>
            <NavigationsContainer />
            <UserAvatarContainer
              disabled={isScrolling}
              whiteHeader={whiteHeader}
            />
            <MenuContainer />
          </>
        ) : (
          !isSignPathname && (
            <NavLink className="button" to="/signin">
              Sign in
            </NavLink>
          )
        )}
      </div>
    </header>
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
