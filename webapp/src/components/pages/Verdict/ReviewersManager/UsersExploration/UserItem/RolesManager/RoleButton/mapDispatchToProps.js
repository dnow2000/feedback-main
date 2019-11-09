import { requestData } from 'redux-thunk-data'

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

export default mapDispatchToProps
