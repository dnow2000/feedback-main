import React from 'react'

import HeaderContainer from 'components/layout/Header/HeaderContainer'
import MainContainer from 'components/layout/Main/MainContainer'

import ApplyingReviewersContainer from './ApplyingReviewers/ApplyingReviewersContainer'
import UsersExplorationContainer from './UsersExploration/UsersExplorationContainer'

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
          <ApplyingReviewersContainer />
        </section>
      </div>
    </MainContainer>
  </>
)

export default Users
