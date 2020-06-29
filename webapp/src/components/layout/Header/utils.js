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
    label: () => 'Sources',
    path: '/sources',
    visible: () => visibleFor(['editor', 'reviewer', 'testifier'])
  },
  {
    label: () => 'Verified',
    path: '/verdicts',
    visible: () => true
  },
  {
    label: currentRoles => currentRoles.admin
      ? 'Users'
      : 'Reviewers',
    path: '/users',
    visible: visibleFor(['admin', 'editor'])
  },
].map(link => ({ className: 'item navigation', ...link }))
