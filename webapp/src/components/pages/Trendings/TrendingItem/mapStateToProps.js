import { selectCurrentUser } from 'with-react-redux-login'

import { selectEditorRoleByUserId } from '../../../../selectors'

function mapStateToProps(state) {
  const currentUser = selectCurrentUser(state)
  const { id: currentUserId } = currentUser || {}

  const editorRole = selectEditorRoleByUserId(state, currentUserId)

  const canVerdict = typeof editorRole !== 'undefined'

  return {
    canVerdict,
  }
}

export default mapStateToProps
