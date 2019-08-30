import { connect } from 'react-redux'
import { compose } from 'redux'

import Trendings from './Trendings'
import selectTrendings from './selectors/selectTrendings'
import { withRequiredLogin, withRoles } from '../../hocs'

const mapStateToProps = state =>  {
  return {
    trendings: selectTrendings(state)
  }
}

export default compose(
  withRequiredLogin,
  withRoles({ accessRoleTypes: ['editor'] }),
  connect(mapStateToProps)
)(Trendings)
