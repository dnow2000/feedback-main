import React from 'react'

import HeaderContainer from 'components/layout/Header/HeaderContainer'
import MainContainer from 'components/layout/Main/MainContainer'

import ReviewsExplorationContainer from './ReviewsExploration/ReviewsExplorationContainer'

const Reviews = () => (
  <>
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
  </>
)

export default Reviews
