import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { selectCurrentUser } from 'with-react-login'

import Avatar from './Avatar'
import Hamburger from './Hamburger'
import Logo from './Logo'
import Navigation from './Navigation'

const signPathnames = ['/signin', '/signup']

const Header = ({ currentUser, location, whiteHeader }) => {
  const isSignPathname = signPathnames.includes(location.pathname)

  return (
    <Fragment>
      <header className="header flex-start flex-columns items-center p12">
        <div className="mr12">
          <Logo />
        </div>
        <Avatar whiteHeader={whiteHeader} />
        <div className="flex-auto" />
        {currentUser && !isSignPathname ? (
          <Hamburger />
        ) : (
          !isSignPathname && (
            <NavLink className="button is-primary" to="/signin">
              Sign In
            </NavLink>
          )
        )}
      </header>
      <Navigation />
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

function mapStateToProps(state) {
  return {
    currentUser: selectCurrentUser(state),
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Header)
