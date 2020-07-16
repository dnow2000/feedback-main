import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { selectCurrentUser } from 'with-react-redux-login'

import Logo from 'components/layout/Logo'
import { assignScroll } from 'reducers/scroll'
import { isAtTopFromWindow } from 'utils/scroll'

import Menu from 'components/layout/Header/Menu'
import Navigations from 'components/layout/Header/Navigations'


const pathnamesWithoutSignin = [
  '/landing',
  '/signin',
  '/signup'
]


const _ = ({ withMenu=false }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const withSignin = pathnamesWithoutSignin.includes(location.pathname)


  const currentUser = useSelector(selectCurrentUser)
  const showSignin = !currentUser && !withSignin


  const isAtTop = useSelector(state => state.scroll.isAtTop)


  useEffect(() => {
    const handleScroll = () => {
      const nextIsAtTop = isAtTopFromWindow()
      if (isAtTop !== nextIsAtTop) dispatch(
        assignScroll({ isAtTop: nextIsAtTop }))
    }
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [dispatch, isAtTop])


  return (
    <header className={classnames("header", { 'is-blurred': !isAtTop })}>
      <div className="container">
        <div className="left-content">
          <Logo type="header" />
        </div>

        {withMenu && (
          <div className="right-content">
            <Navigations />
            <Menu />
          </div>
        )}
        {showSignin && (
          <NavLink
            className="button"
            to="/signin"
          >
            {'Sign in'}
          </NavLink>
        )}
      </div>
    </header>
  )
}

_.propTypes = {
  withMenu: PropTypes.bool.isRequired
}

export default _
