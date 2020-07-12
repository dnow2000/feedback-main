import React from 'react'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'

import withRedirectWhenLoggedIn from 'components/hocs/withRedirectWhenLoggedIn'
import withRequiredLogin from 'components/hocs/withRequiredLogin'
import withRoles from 'components/hocs/withRoles'
import About from 'components/pages/About'
import Account from 'components/pages/Account'
import Appearance from 'components/pages/Appearance'
import Content from 'components/pages/Content'
import Exploration from 'components/pages/Exploration'
import Landing from 'components/pages/Landing'
import Review from 'components/pages/Review'
import Reviews from 'components/pages/Reviews'
import Sources from 'components/pages/Sources'
import User from 'components/pages/User'
import Users from 'components/pages/Users'
import Verdict from 'components/pages/Verdict'
import Verdicts from 'components/pages/Verdicts'
import Signin from 'components/pages/Signin'
import Signup from 'components/pages/Signup'
import Trendings from 'components/pages/Trendings'


export const entityMatch = '[A-Za-z0-9]{2,}'
export const formPath = `(${entityMatch}|creation)/:modification(modification)?`


export const routes = [
  {
    exact: true,
    path: '/',
    render: () => <Redirect to="/landing" />,
  },
  {
    component: About,
    exact: true,
    path: '/about',
    title: 'About'
  },
  {
    component: withRequiredLogin(Account),
    exact: true,
    path: `/account`,
    title: 'Account',
  },
  {
    component: withRequiredLogin(Appearance),
    exact: true,
    path: `/appearances/:appearanceId${formPath}`,
    title: 'Appearance',
  },
  {
    component: compose(
      withRequiredLogin,
      withRoles({ creationRoleTypes: ['editor'], modificationRoleTypes: ['editor'] }),
    )(Content),
    exact: true,
    path: `/contents/:contentId${formPath}`,
    title: 'Content',
  },
  {
    component: withRequiredLogin(Exploration),
    exact: true,
    path: '/exploration/:collectionName?/:entityId([A-Za-z0-9]{2,})?',
    title: 'Exploration'
  },
  {
    component: Landing,
    exact: true,
    path: '/landing',
    title: 'Landing'
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
    component: withRedirectWhenLoggedIn(Signin),
    exact: true,
    path: '/signin',
    title: 'Signin',
  },
  {
    component: withRedirectWhenLoggedIn(Signup),
    exact: true,
    path: '/signup/(apply)?/:roleType(reviewer|editor)?',
    title: 'Signup',
  },
  {
    component: withRequiredLogin(Sources),
    exact: true,
    path: '/sources',
    title: 'Sources',
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
  {
    component: compose(
      withRequiredLogin,
      withRoles({ accessRoleTypes: ['admin', 'editor'] }),
    )(User),
    exact: true,
    path: '/users/:userId',
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
    component: withRequiredLogin(Verdict),
    exact: true,
    path: `/verdicts/:verdictId(${entityMatch})/appearances`,
    title: 'Verdict',
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
    component: Verdicts,
    exact: true,
    path: '/verdicts',
    title: 'Verdicts',
  }
]
