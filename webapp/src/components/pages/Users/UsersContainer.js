import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import withFormidable from 'with-react-formidable'
import withQuery from 'with-react-query'

import withRequiredLogin from 'components/hocs/withRequiredLogin'
import withRoles from 'components/hocs/withRoles'

import Users from './Users'

export default compose(
  withRouter,
  withQuery(),
  withFormidable,
  withRequiredLogin,
  withRoles({
    creationRoleTypes: ['editor'],
    modificationRoleTypes: ['editor']
  })
)(Users)
