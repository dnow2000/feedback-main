import React from 'react'
import { Redirect } from 'react-router-dom'

import ArticleContainer from '../pages/Article/ArticleContainer'
import ArticlesContainer from '../pages/Articles/ArticlesContainer'
import HomeContainer from '../pages/Home/HomeContainer'
import ReviewContainer from '../pages/Review/ReviewContainer'
import ReviewsContainer from '../pages/Reviews/ReviewsContainer'
import UserContainer from '../pages/User/UserContainer'
import UsersContainer from '../pages/Users/UsersContainer'
import VerdictContainer from '../pages/Verdict/VerdictContainer'
import VerdictsContainer from '../pages/Verdicts/VerdictsContainer'
import SigninContainer from '../pages/Signin/SigninContainer'
import SignupContainer from '../pages/Signup/SignupContainer'
import TrendingsContainer from '../pages/Trendings/TrendingsContainer'

const routes = [
  {
    exact: true,
    path: '/',
    render: () => <Redirect to="/home" />,
  },
  {
    exact: true,
    path: '/articles/:articleId([A-Z][a-z]+|creation)/:modification(modification)?',
    render: () => <ArticleContainer />,
    title: 'Article',
  },
  {
    exact: true,
    path: '/articles',
    render: () => <ArticlesContainer />,
    title: 'Articles',
  },
  {
    exact: true,
    path: '/home',
    render: () => <HomeContainer />,
    title: 'Home',
  },
  {
    exact: true,
    path: '/reviews/:reviewId',
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
    path: '/verdicts/:verdictId',
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
