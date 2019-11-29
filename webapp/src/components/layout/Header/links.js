import visibleFor from './visibleFor'

const links = [
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

export default links
