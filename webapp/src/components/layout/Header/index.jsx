import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { selectCurrentUser } from 'with-react-redux-login'

import Logo from 'components/layout/Logo'
import { assignScroll } from 'reducers/scroll'
import { isAtTopFromWindow } from 'utils/scroll'

import Menu from './Menu'
import Navigations from './Navigations'


const pathnamesWithoutSignin = [
  '/signin',
  '/signup'
]


const _ = ({ withLinks }) => {
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
    <header className={classnames('header')}>
      <div className="container">
        <div className="left-content">
          <Logo
            text=""
            type="header"
          />
        </div>

        {withLinks && (
          <div className="right-content">
            <Navigations />
            <a
              className='support-us'
              href='https://sciencefeedback.co/donate/'
              rel="noopener noreferrer"
              target='_blank'
            >
              {'Support us'}
            </a>
            <Menu />
            {showSignin && (
              <NavLink
                className="button"
                to="/signin"
              >
                {'Sign in'}
              </NavLink>
            )}
          </div>
        )}
      </div>
    </header>
  )
}


_.defaultProps = {
  withLinks: true
}


_.propTypes = {
  withLinks: PropTypes.bool
}

export default _
