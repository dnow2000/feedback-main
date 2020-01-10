import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import withForm from 'with-react-form'

import withRequiredLogin from 'components/hocs/withRequiredLogin'
import withRoles from 'components/hocs/withRoles'

import Trendings from './Trendings'
import selectTrendings from './selectors/selectTrendings'


export default compose(
  withRouter,
  withRequiredLogin,
  withForm,
  withRoles({ accessRoleTypes: ['editor'] }),
)(Trendings)
