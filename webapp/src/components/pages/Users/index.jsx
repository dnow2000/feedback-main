import React from 'react'

import Header from 'components/layout/Header'
import Main from 'components/layout/Main'

import ApplyingReviewers from './ApplyingReviewers'


export default () => (
  <>
    <Header />
    <Main className="users">
      <div className="container">
        <section>
          <h1 className="title">
            Applying Reviewers
          </h1>
          <div className="separator" />
          <ApplyingReviewers />
        </section>
      </div>
    </Main>
  </>
)
