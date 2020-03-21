import createCachedSelector from 're-reselect'
import { selectCurrentUser } from 'with-react-redux-login'


const mapArgsToCacheKey = (state, types) => (types || []).join(',')


export default createCachedSelector(
  state => state.data.roles,
  selectCurrentUser,
  (state, types) => types,
  (roles, currentUser, types) => types && currentUser && roles && roles
    .filter(role => role.userId === currentUser.id && types.includes(role.type))
)(mapArgsToCacheKey)
