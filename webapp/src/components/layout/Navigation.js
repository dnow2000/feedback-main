import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { selectCurrentUser } from 'with-react-redux-login'

import SignoutButton from './SignoutButton'
import { closeNavigation } from '../../reducers/navigation'
import { selectCurrentRolesByTypes } from '../../selectors'

const links = [
  {
    label: 'Articles',
    path: '/articles',
    visible: () => true
  },
  {
    label: 'Home',
    path: '/',
    visible: () => true
  },
  {
    disabled: true,
    label: 'Reviews',
    path: '/reviews',
    visible: currentRoles => currentRoles.map(cr => cr.type).includes('reviewer')
  },
  {
    label: 'Trendings',
    path: '/trendings',
    visible: currentRoles => currentRoles.map(cr => cr.type).includes('editor')
  },
  {
    label: 'Users',
    path: '/users',
    visible: currentRoles => currentRoles.map(cr => cr.type).includes('admin')
  },
  {
    disabled: true,
    label: 'Verdicts',
    path: '/verdicts',
    visible: currentRoles => currentRoles.map(cr => cr.type).includes('editor')
  },
]

const Navigation = ({ currentRoles, dispatch, isActive, location, currentUser }) => {
  const classes = classnames({ showing: isActive }, 'navigation')
  return (
    <div
      className={classes}
      onClick={() => dispatch(closeNavigation())}
      onKeyDown={null}
      role="button"
      tabIndex="0"
    >
      <div
        className="list px12 py10"
        onClick={e => {
          e.nativeEvent.stopImmediatePropagation() // Prevent click bubbling and closing modal
          e.stopPropagation()
        }}
        onKeyDown={null}
        role="button"
        tabIndex="0"
      >
        {links &&
          links.filter(({ disabled }) => !disabled)
               .map(({ external, label, target, path, visible }) => (
            visible(currentRoles) && (
              <div className="item" key={label}>
                {path === location.pathname ? (
                  <div className="py12 link current">
                    {label}
                  </div>
                ) : (
                  <NavLink
                    className="block py12 link"
                    id={`see-${path}`}
                    external={external}
                    onClick={() => dispatch(closeNavigation())}
                    to={path}
                    target={target}
                  >
                    {label}
                  </NavLink>
                )}
              </div>
            )))}
        {currentUser && (
          <div className="item">
            <SignoutButton
              className="block py12 link"
              handleSuccessRedirect={() => '/signin'}
              Tag="a"
            >
            Logout
            </SignoutButton>
          </div>
        )}
      </div>
    </div>
  )
}

Navigation.defaultProps = {
  currentRoles: null,
  currentUser: null,
  isActive: false,
}

Navigation.propTypes = {
  currentRoles: PropTypes.array,
  currentUser: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dispatch: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  location: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    currentRoles: selectCurrentRolesByTypes(state, ['admin', 'editor', 'reviewer']),
    currentUser: selectCurrentUser(state),
    isActive: state.navigation.isActive,
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Navigation)
