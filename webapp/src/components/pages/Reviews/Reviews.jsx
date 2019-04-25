import React, { Fragment } from 'react'

import ReviewsExplorationContainer from './ReviewsExploration/ReviewsExplorationContainer'
import Main from '../../layout/Main'
import Header from '../../layout/Header'

const Reviews = () => (
  <Fragment>
    <Header />
    <Main name="reviews">

      <section className="section hero is-relative">
        <h1 className="title">
  Reviews
        </h1>
      </section>

      <section className="section hero">
        <ReviewsExplorationContainer />
      </section>
    </Main>
  </Fragment>
)

export default Reviews
