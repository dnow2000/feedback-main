import { connect } from 'react-redux'
import { compose } from 'redux'
import withQueryRouter from 'with-query-router'

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
  withQueryRouter(),
  withRequiredLogin,
  withRoles({ accessRoleTypes: ['editor'] }),
  connect(mapStateToProps)
)(Trendings)
