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
    label: () => 'Trending news',
    path: '/trendings',
    visible: visibleFor(['editor'])
  },
  {
    label: () => 'To Review',
    path: '/articles',
    visible: () => visibleFor(['editor', 'reviewer'])
  },
  {
    label: () => 'Verified',
    path: '/verdicts',
    visible: visibleFor(['editor'])
  },
  {
    label: currentRoles => currentRoles.admin
      ? 'Users'
      : 'Reviewers',
    path: '/users',
    visible: visibleFor(['admin', 'editor'])
  },
]
