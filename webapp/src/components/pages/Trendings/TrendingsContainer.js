import { connect } from 'react-redux'
import { compose } from 'redux'

import Trendings from './Trendings'

import { withRequiredLogin, withRoles } from '../../hocs'
import { selectTrendings } from '../../../selectors'

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
