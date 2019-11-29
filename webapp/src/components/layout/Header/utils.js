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
    label: () => 'To Review',
    path: '/articles',
    visible: () => true
  },
  {
    disabled: () => true,
    label: 'Reviews',
    path: '/reviews',
    visible: visibleFor(['reviewer'])
  },
  {
    label: () => 'Trending news',
    path: '/trendings',
    visible: visibleFor(['editor'])
  },
  {
    label: currentRoles => currentRoles.admin
      ? 'Users'
      : 'Reviewers',
    path: '/users',
    visible: visibleFor(['admin'])
  },
  {
    disabled: true,
    label: 'Verified',
    path: '/verdicts',
    visible: visibleFor(['editor'])
  },
]
