import React, { Fragment } from 'react'
import { compose } from 'redux'

import UsersExploration from './UsersExploration'
import { withRedirectToSigninWhenNotAuthenticated, withRoles } from '../../hocs'
import Header from '../../layout/Header'
import Main from '../../layout/Main'

const Users = () => (
  <Fragment>
    <Header />
    <Main name="users">
      <section>
        <UsersExploration />
      </section>
    </Main>
  </Fragment>
)

export default compose(
  withRedirectToSigninWhenNotAuthenticated,
  withRoles({ creationRoleTypes: ['master'], modificationRoleTypes: ['master'] })
)(Users)
