import React from 'react'

import Header from 'components/layout/Header'
import Main from 'components/layout/Main'

import ApplyingReviewers from './ApplyingReviewers'

const Users = () => (
  <>
    <Header />
    <Main name="users">
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

export default Users
