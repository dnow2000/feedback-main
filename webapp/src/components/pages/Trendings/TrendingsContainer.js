import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import withForm from 'with-react-form'
import withQuery from 'with-react-query'

import withRequiredLogin from 'components/hocs/withRequiredLogin'
import withRoles from 'components/hocs/withRoles'

import Trendings from './Trendings'
import selectTrendings from './selectors/selectTrendings'

const mapStateToProps = state =>  {
  return {
    trendings: selectTrendings(state)
  }
}

export default compose(
  withRouter,
  withRequiredLogin,
  withForm,
  withRoles({ accessRoleTypes: ['editor'] }),
  withQuery(),
  connect(mapStateToProps)
)(Trendings)
