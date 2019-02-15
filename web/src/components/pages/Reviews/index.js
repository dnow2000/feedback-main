import React, { Fragment } from 'react'
import { compose } from 'redux'

import ReviewsExploration from './ReviewsExploration'
import { withLoginRedirectToSignin, withRoles } from '../../hocs'
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
        <ReviewsExploration />
      </section>
    </Main>
  </Fragment>
)

export default compose(
  withLoginRedirectToSignin,
  withRoles({ accessRoleTypes: ['editor'] }),
)(Reviews)
