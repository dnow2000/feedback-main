import createCachedSelector from 're-reselect'
import { selectCurrentUser } from 'with-react-redux-login'

import selectCurrentRolesByTypes from './selectCurrentRolesByTypes'


const visibleFor = roleTypes =>
  currentRoles => {
    if (!roleTypes || roleTypes.length === 0) {
      return false
    }
    return roleTypes.every(roleType =>
    (currentRoles || []).map(cr => cr.type).includes(roleType))
  }


export const links = [
  {
    componentNames: ['Menu', 'Navigations'],
    label: () => 'About',
    path: '/about',
    visible: () => true
  },
  {
    componentNames: ['Menu', 'Navigations'],
    label: () => 'Trending news',
    path: '/trendings',
    visible: visibleFor(['editor'])
  },
  /*
  {
    componentNames: ['Menu', 'Navigations'],
    label: () => 'Sources',
    path: '/sources',
    visible: () => visibleFor(['editor', 'reviewer', 'testifier'])
  },
  {
    componentNames: ['Menu', 'Navigations'],
    label: () => 'Verified',
    path: '/verdicts',
    visible: () => true
  },
  {
    componentNames: ['Menu', 'Navigations'],
    label: currentRoles => currentRoles.admin
      ? 'Users'
      : 'Reviewers',
    path: '/users',
    visible: visibleFor(['admin', 'editor'])
  },
  {
    componentNames: ['Menu'],
    label: () => 'My account',
    path: '/account',
    visible: (currentRoles, currentUser) => currentUser
  }
  */
]


 const mapArgsToCacheKey = (state, componentName) =>
   componentName || ''


export default createCachedSelector(
  selectCurrentUser,
  state => selectCurrentRolesByTypes(state, ['admin', 'editor', 'reviewer']),
  (state, componentName) => componentName,
  (currentUser, currentRoles, componentName) =>
    links.filter(
      ({ componentNames, disabled, visible }) => !disabled &&
                                                 componentNames.includes(componentName) &&
                                                 visible(currentRoles, currentUser))
          .map(link => ({...link, label: link.label(currentRoles, currentUser)}))
)(mapArgsToCacheKey)
