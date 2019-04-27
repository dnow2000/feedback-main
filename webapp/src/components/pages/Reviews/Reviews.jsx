import React, { Fragment } from 'react'

import ReviewsExplorationContainer from './ReviewsExploration/ReviewsExplorationContainer'
import HeaderContainer from '../../layout/Header/HeaderContainer'
import MainContainer from '../../layout/Main/MainContainer'

const Reviews = () => (
  <Fragment>
    <HeaderContainer />
    <MainContainer name="reviews">

      <section className="section hero is-relative">
        <h1 className="title">
  Reviews
        </h1>
      </section>

      <section className="section hero">
        <ReviewsExplorationContainer />
      </section>
    </MainContainer>
  </Fragment>
)

export default Reviews
