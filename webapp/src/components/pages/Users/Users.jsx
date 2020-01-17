import React from 'react'

import HeaderContainer from 'components/layout/Header/HeaderContainer'
import MainContainer from 'components/layout/Main/MainContainer'

import ApplyingReviewers from './ApplyingReviewers'

const Users = () => (
  <>
    <HeaderContainer />
    <MainContainer name="users">
      <div className="container">
        <section>
          <h1 className="title">
            Applying Reviewers
          </h1>
          <div className="separator" />
          <ApplyingReviewers />
        </section>
      </div>
    </MainContainer>
  </>
)

export default Users
