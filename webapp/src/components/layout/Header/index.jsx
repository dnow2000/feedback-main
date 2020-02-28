import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { selectCurrentUser } from 'with-react-redux-login'

import Logo from 'components/layout/Logo'
import { assignScroll } from 'reducers/scroll'
import selectCurrentRolesByTypes from 'selectors/selectCurrentRolesByTypes'

import Menu from './Menu'
import Navigations from './Navigations'


const signPathnames = ['/signin', '/signup']


export default () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const isSignPathname = signPathnames.includes(location.pathname)


  const currentUser = useSelector(selectCurrentUser)

  const isAtTop = useSelector(state => state.scroll.isAtTop)


  useEffect(() => {
    const handleScroll = event => dispatch(assignScroll(window.scrollY < 50))
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [dispatch])


  return (
    <header className={classnames("header", { 'is-at-top': isAtTop })}>
      <div className="container">
        <div className="left-content">
          <Logo type="header" />
        </div>

        <div className="flex-auto" />
        {currentUser && !isSignPathname ? (
          <>
            <Navigations />
            <Menu />
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
