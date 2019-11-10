import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { requestData } from 'redux-thunk-data'

import selectRoleByUserIdAndType from 'selectors/selectRoleByUserIdAndType'

import RoleButton from './RoleButton'

const mapStateToProps = (state, ownProps) => {
  const { roleType, user } = ownProps
  const { id: userId } = user || {}
  const role = selectRoleByUserIdAndType(state, userId, roleType.value)
  return {
    role
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { roleType, user } = ownProps
  const { id: userId } = user || {}
  return {
    toggleRole: role => () => {
      const { id: roleId } = role || {}
      const roleIsAlreadyActivated = typeof roleId !== "undefined"

      let apiPath = "/roles"
      if (roleIsAlreadyActivated) {
        apiPath = `${apiPath}/${roleId}`
      }

      const method = roleIsAlreadyActivated
        ? "DELETE"
        : "POST"

      let body
      if (!roleIsAlreadyActivated) {
        body = {
          type: roleType.value,
          userId
        }
      }

      dispatch(requestData({
        apiPath,
        body,
        method
      }))
    }
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(RoleButton)
