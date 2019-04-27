import React, { Fragment } from 'react'

import UsersExplorationContainer from './UsersExploration/UsersExplorationContainer'
import HeaderContainer from '../../layout/Header/HeaderContainer'
import MainContainer from '../../layout/Main/MainContainer'

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
