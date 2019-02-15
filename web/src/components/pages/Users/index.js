import { withLogin } from 'pass-culture-shared'
import React, { Fragment } from 'react'
import { compose } from 'redux'

import UsersExploration from './UsersExploration'
import { withRoles } from '../../hocs'
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
  withLogin({ failRedirect: '/signin', isRequired: true }),
  withRoles({ createRoleTypes: ['master'], editRoleTypes: ['master'] })
)(Users)
