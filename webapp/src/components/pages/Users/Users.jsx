import React, { Fragment } from 'react'

import HeaderContainer from 'components/layout/Header/HeaderContainer'
import MainContainer from 'components/layout/Main/MainContainer'

import UsersExplorationContainer from './UsersExploration/UsersExplorationContainer'

const Users = () => (
  <Fragment>
    <HeaderContainer />
    <MainContainer name="users">
      <section>
        <UsersExplorationContainer />
      </section>
    </MainContainer>
  </Fragment>
)

export default Users
