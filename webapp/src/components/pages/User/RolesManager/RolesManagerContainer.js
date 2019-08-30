import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import RolesManager from './RolesManager'
import selectRoleByUserIdAndType from '../../../../selectors/selectRoleByUserIdAndType'

const mapStateToProps = (state, ownProps) => {
  const { data: { roleTypes } } = state
  const { match: { params: { userId } } } = ownProps

  if (!roleTypes) {
    return { roleTypes }
  }

  const rolesByType = {}
  roleTypes.forEach(roleType => {
    rolesByType[roleType] = selectRoleByUserIdAndType(state, userId, roleType)})

  return {
    roleTypes,
    ...rolesByType
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(RolesManager)
