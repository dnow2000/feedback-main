import createCachedSelector from 're-reselect'
import { selectCurrentUser } from 'with-react-redux-login'


const mapArgsToCacheKey = (state, type) => type || ' '


export default createCachedSelector(
  state => state.data.roles,
  selectCurrentUser,
  (state, type) => type,
  (roles, currentUser, type) => !!!((type && currentUser && roles) || [])
    .find(role => role.userId === currentUser.id && type === role.type)
)(mapArgsToCacheKey)
