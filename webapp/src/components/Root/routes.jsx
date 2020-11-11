
import React from 'react'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'

import withOptionalLogin from 'components/hocs/withOptionalLogin'
import withRedirectWhenLoggedIn from 'components/hocs/withRedirectWhenLoggedIn'
import withRequiredLogin from 'components/hocs/withRequiredLogin'
import withRoles from 'components/hocs/withRoles'
import About from 'components/pages/About'
import Account from 'components/pages/Account'
import Content from 'components/pages/Content'
import Exploration from 'components/pages/Exploration'
import Landing from 'components/pages/Landing'
import Link from 'components/pages/Link'
import Review from 'components/pages/Review'
import Reviews from 'components/pages/Reviews'
import Sources from 'components/pages/Sources'
import Tasks from 'components/pages/Tasks'
import User from 'components/pages/User'
import Users from 'components/pages/Users'
import Verdict from 'components/pages/Verdict'
import Verdicts from 'components/pages/Verdicts'
import Signin from 'components/pages/Signin'
import Signup from 'components/pages/Signup'
import Trendings from 'components/pages/Trendings'

import { entityMatch, formMatch } from 'utils/router'


export default [
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
    component: compose(withRequiredLogin,
                       withRoles({
                         creationRoleTypes: ['testifier'],
                         modificationRoleTypes: ['testifier']})
                       )(Link),
    exact: true,
    path: `/links/:linkId${formMatch}`,
    title: 'Link',
  },
  {
    component: compose(withRequiredLogin,
                       withRoles({
                         accessRoleTypes: ['inspector']})
                       )(Link),
    exact: true,
    path: `/links/:linkId/interactions`,
    title: 'Link Interactions',
  },
  {
    component: compose(withRequiredLogin,
                       withRoles({
                         creationRoleTypes: ['editor'],
                         modificationRoleTypes: ['editor']}),
                       )(Content),
    exact: true,
    path: `/contents/:contentId${formMatch}`,
    title: 'Content',
  },
  {
    component: withRequiredLogin(Exploration),
    exact: true,
    path: '/exploration/:collectionName?/:entityId([A-Za-z0-9]{2,})?',
    title: 'Exploration'
  },
  {
    component: withOptionalLogin(Landing),
    exact: true,
    path: '/landing',
    title: 'Landing'
  },
  {
    component: compose(withRequiredLogin,
                       withRoles({
                         accessRoleTypes: ['editor', 'reviewer'],
                         creationRoleTypes: ['reviewer'],
                         modificationRoleTypes: ['reviewer']}),
                       )(Review),
    exact: true,
    path: `/reviews/:reviewId${formMatch}`,
    title: 'Review',
  },
  {
    component: compose(withRequiredLogin,
                       withRoles({
                         accessRoleTypes: ['editor'] })
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
    /*
    component: compose(withRequiredLogin,
                       withRoles({
                         accessRoleTypes: ['admin'],
                         creationRoleTypes: ['admin'],
                         modificationRoleTypes: ['admin']})
                       )(Tasks),
    */
    component: Tasks,
    exact: true,
    path: '/tasks',
    title: 'Tasks',
  },
  {
    component: compose(withRequiredLogin,
                       withRoles({
                         accessRoleTypes: ['editor']})
                       )(Trendings),
    exact: true,
    path: '/trendings',
    title: 'Trendings',
  },
  {
    component: compose(withRequiredLogin,
                       withRoles({
                         accessRoleTypes: ['admin', 'editor', 'inspector']})
                       )(User),
    exact: true,
    path: '/users/:userId',
    title: 'User',
  },
  {
    component: compose(withRequiredLogin,
                       withRoles({
                         creationRoleTypes: ['admin', 'editor', 'inspector'],
                         modificationRoleTypes: ['admin', 'editor', 'inspector']})
                       )(Users),
    exact: true,
    path: '/users',
    title: 'Users',
  },
  {
    component: withOptionalLogin(Verdict),
    exact: true,
    path: `/verdicts/:verdictId(${entityMatch})/testimony/:tab(quotations|shares|graph|backlinks)?`,
    title: 'Verdict',
  },
  {
    component: compose(withRequiredLogin,
                       withRoles({
                         accessRoleTypes: ['editor'],
                         creationRoleTypes: ['editor'],
                         modificationRoleTypes: ['editor']})
                      )(Verdict),
    exact: true,
    path: `/verdicts/:verdictId${formMatch}/edition`,
    title: 'Verdict',
  },
  {
    component: withOptionalLogin(Verdicts),
    exact: true,
    path: '/verdicts',
    title: 'Verdicts',
  }
]
