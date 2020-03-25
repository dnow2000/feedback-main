import React from 'react'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'

import withRedirectWhenLoggedIn from 'components/hocs/withRedirectWhenLoggedIn'
import withRequiredLogin from 'components/hocs/withRequiredLogin'
import withRoles from 'components/hocs/withRoles'
import Article from 'components/pages/Article'
import Articles from 'components/pages/Articles'
import Claim from 'components/pages/Claim'
import Claims from 'components/pages/Claims'
import Landing from 'components/pages/Landing'
import Review from 'components/pages/Review'
import Reviews from 'components/pages/Reviews'
import UserContainer from 'components/pages/User/UserContainer'
import Users from 'components/pages/Users'
import Verdict from 'components/pages/Verdict'
import Verdicts from 'components/pages/Verdicts'
import Signin from 'components/pages/Signin'
import Signup from 'components/pages/Signup'
import Trendings from 'components/pages/Trendings'


const formPath = '([A-Za-z0-9]{2,}|creation)/:modification(modification)?'

const routes = [
  {
    exact: true,
    path: '/',
    render: () => <Redirect to="/landing" />,
  },
  {
    component: compose(
      withRequiredLogin,
      withRoles({ creationRoleTypes: ['editor'], modificationRoleTypes: ['editor'] }),
    )(Article),
    exact: true,
    path: `/articles/:articleId${formPath}`,
    title: 'Article',
  },
  {
    component: withRequiredLogin(Articles),
    exact: true,
    path: '/articles',
    title: 'Articles',
  },
  {
    component: Claim,
    exact: true,
    path: `/claims/:claimId${formPath}`,
    title: 'Claim',
  },
  {
    component: Claims,
    exact: true,
    path: '/claims',
    title: 'Claims',
  },
  {
    component: withRedirectWhenLoggedIn(Landing),
    exact: true,
    path: '/landing',
    title: 'Landing',
  },
  {
    component: compose(
      withRequiredLogin,
      withRoles({ creationRoleTypes: ['reviewer'], modificationRoleTypes: ['reviewer'] }),
    )(Review),
    exact: true,
    path: `/reviews/:reviewId${formPath}`,
    title: 'Review',
  },
  {
    component: compose(
      withRequiredLogin,
      withRoles({ accessRoleTypes: ['editor'] }),
    )(Reviews),
    exact: true,
    path: '/reviews',
    title: 'Reviews',
  },
  {
    exact: true,
    path: '/users/:userId',
    render: () => <UserContainer />,
    title: 'User',
  },
  {
    component: compose(
      withRequiredLogin,
      withRoles({
        creationRoleTypes: ['editor'],
        modificationRoleTypes: ['editor']
      })
    )(Users),
    exact: true,
    path: '/users',
    title: 'Users',
  },
  {
    component: compose(
      withRequiredLogin,
      withRoles({
        creationRoleTypes: ['editor'],
        modificationRoleTypes: ['editor']
      }),
    )(Verdict),
    exact: true,
    path: `/verdicts/:verdictId${formPath}`,
    title: 'Verdict',
  },
  {
    component: withRequiredLogin(Verdicts),
    exact: true,
    path: '/verdicts',
    title: 'Verdicts',
  },
  {
    component: withRedirectWhenLoggedIn(Signin),
    exact: true,
    path: '/signin',
    title: 'Signin',
  },
  {
    exact: true,
    path: '/signup',
    render: () => <Redirect to="/signup/reviewer" />,
  },
  {
    component: withRedirectWhenLoggedIn(Signup),
    exact: true,
    path: '/signup/:roleType(reviewer|editor)',
    title: 'Signup',
  },
  {
    component: compose(
      withRequiredLogin,
      withRoles({ accessRoleTypes: ['editor'] })
    )(Trendings),
    exact: true,
    path: '/trendings',
    title: 'Trendings',
  },
]

export default routes
