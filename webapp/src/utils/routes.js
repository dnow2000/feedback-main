import React from 'react'
import { Redirect } from 'react-router-dom'

import ArticleContainer from '../components/pages/Article/ArticleContainer'
import ArticlesContainer from '../components/pages/Articles/ArticlesContainer'
import Home from '../components/pages/Home'
import ReviewContainer from '../components/pages/Review/ReviewContainer'
import Reviews from '../components/pages/Reviews'
import UserContainer from '../components/pages/User/UserContainer'
import UsersContainer from '../components/pages/Users/UsersContainer'
import VerdictContainer from '../components/pages/Verdict/VerdictContainer'
import Verdicts from '../components/pages/Verdicts'
import Signin from '../components/pages/Signin'
import Signup from '../components/pages/Signup'
import Trendings from '../components/pages/Trendings'

const routes = [
  {
    exact: true,
    path: '/',
    render: () => <Redirect to="/home" />,
  },
  {
    exact: true,
    path: '/articles/:articleId',
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
    render: () => <Home />,
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
    render: () => <Reviews />,
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
    render: () => <Verdicts />,
    title: "Verdicts",
  },
  {
    exact: true,
    path: '/signin',
    render: () => <Signin />,
    title: 'Signin',
  },
  {
    exact: true,
    path: '/signup',
    render: () => <Signup />,
    title: 'Signup',
  },
  {
    exact: true,
    path: '/trendings',
    render: () => <Trendings />,
    title: 'Trendings',
  },
]

export default routes
