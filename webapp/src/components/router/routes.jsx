import React from 'react'
import { Redirect } from 'react-router-dom'

import withRedirectWhenLoggedIn from 'components/hocs/withRedirectWhenLoggedIn'
import withRequiredLogin from 'components/hocs/withRequiredLogin'
import ArticleContainer from 'components/pages/Article/ArticleContainer'
import Articles from 'components/pages/Articles'
import LandingContainer from 'components/pages/Landing/LandingContainer'
import ReviewContainer from 'components/pages/Review/ReviewContainer'
import ReviewsContainer from 'components/pages/Reviews/ReviewsContainer'
import UserContainer from 'components/pages/User/UserContainer'
import UsersContainer from 'components/pages/Users/UsersContainer'
import VerdictContainer from 'components/pages/Verdict/VerdictContainer'
import VerdictsContainer from 'components/pages/Verdicts/VerdictsContainer'
import SigninContainer from 'components/pages/Signin/SigninContainer'
import SignupContainer from 'components/pages/Signup/SignupContainer'
import TrendingsContainer from 'components/pages/Trendings/TrendingsContainer'


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
    exact: true,
    path: '/landing',
    render: () => <LandingContainer />,
    title: 'Landing',
  },
  {
    exact: true,
    path: `/reviews/:reviewId${formPath}`,
    render: () => <ReviewContainer />,
    title: 'Review',
  },
  {
    exact: true,
    path: '/reviews',
    render: () => <ReviewsContainer />,
    title: 'Reviews',
  },
  {
    exact: true,
    path: '/users/:userId',
    render: () => <UserContainer />,
    title: "User",
  },
  {
    exact: true,
    path: '/users',
    render: () => <UsersContainer />,
    title: "Users",
  },
  {
    exact: true,
    path: `/verdicts/:verdictId${formPath}`,
    render: () => <VerdictContainer />,
    title: "Verdict",
  },
  {
    exact: true,
    path: '/verdicts',
    render: () => <VerdictsContainer />,
    title: "Verdicts",
  },
  {
    exact: true,
    path: '/signin',
    render: () => <SigninContainer />,
    title: 'Signin',
  },
  {
    exact: true,
    path: '/signup',
    render: () => <SignupContainer />,
    title: 'Signup',
  },
  {
    exact: true,
    path: '/trendings',
    render: () => <TrendingsContainer />,
    title: 'Trendings',
  },
]

export default routes
