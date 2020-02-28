import React from 'react'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'

import withRedirectWhenLoggedIn from 'components/hocs/withRedirectWhenLoggedIn'
import withRequiredLogin from 'components/hocs/withRequiredLogin'
import withRoles from 'components/hocs/withRoles'
import ArticleContainer from 'components/pages/Article/ArticleContainer'
import Articles from 'components/pages/Articles'
import Landing from 'components/pages/Landing'
import Review from 'components/pages/Review'
import Reviews from 'components/pages/Reviews'
import UserContainer from 'components/pages/User/UserContainer'
import UsersContainer from 'components/pages/Users/UsersContainer'
import Verdict from 'components/pages/Verdict'
import Verdicts from 'components/pages/Verdicts'
import Signin from 'components/pages/Signin'
import SignupContainer from 'components/pages/Signup/SignupContainer'
import Trendings from 'components/pages/Trendings/Trendings'


const formPath = '([A-Za-z0-9]{2,}|creation)/:modification(modification)?'

const routes = [
  {
    exact: true,
    path: '/',
    render: () => <Redirect to="/landing" />,
  },
  {
    exact: true,
    path: `/articles/:articleId${formPath}`,
    render: () => <ArticleContainer />,
    title: 'Article',
  },
  {
    component: withRequiredLogin(Articles),
    exact: true,
    path: '/articles',
    title: 'Articles',
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
    exact: true,
    path: '/users',
    render: () => <UsersContainer />,
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
    render: () => <SignupContainer />,
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
