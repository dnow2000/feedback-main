import { selectRoleByUserIdAndType } from '../../../../selectors'

function mapStateToProps (state, ownProps) {
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

export default mapStateToProps
