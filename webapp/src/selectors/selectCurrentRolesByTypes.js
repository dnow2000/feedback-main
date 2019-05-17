import createCachedSelector from 're-reselect'
import { selectCurrentUser } from 'with-react-redux-login'

function mapArgsToCacheKey(state, types) {
  return (types || []).join(',')
}

export const selectCurrentRolesByTypes = createCachedSelector(
  state => state.data.roles,
  selectCurrentUser,
  (state, types) => types,
  (roles, currentUser, types) => types && currentUser && roles
    .filter(role => role.userId === currentUser.id && types.includes(role.type))
)(mapArgsToCacheKey)

export default selectCurrentRolesByTypes
