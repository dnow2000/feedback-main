import { selectCurrentUser } from 'with-react-redux-login'

import { selectRoleByUserIdAndType } from '../../../../selectors'

function mapStateToProps(state) {
  const currentUser = selectCurrentUser(state)
  const { id: currentUserId } = currentUser || {}

  const editorRole = selectRoleByUserIdAndType(state, currentUserId, 'editor')

  const canVerdict = typeof editorRole !== 'undefined'

  return {
    canVerdict,
  }
}

export default mapStateToProps
