import React, { Fragment } from 'react'

import UsersExplorationContainer from './UsersExploration/UsersExplorationContainer'
import Header from '../../layout/Header'
import Main from '../../layout/Main'

const Users = () => (
  <Fragment>
    <Header />
    <Main name="users">
      <section>
        <UsersExplorationContainer />
      </section>
    </Main>
  </Fragment>
)

export default Users
